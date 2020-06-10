// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.*;
import com.google.common.collect.Lists;
import com.google.sps.TimeRange;
public final class FindMeetingQuery {

    private int requestTime;
    private boolean tryTwo;

    /**
    *   query() function allows for users to submit a request and a list of events and finds
    *   a list of timeslots that work for the users. This can be used for 2+ users
    *   The steps are:
    *       1. Sort the events, events may not be in order
    *       2. Creates an inverted time list, meaning we merge any edge cases into a single timeline
    *           intead of doing conditional statements every check in the loop, makes for easier to read code
    *           and less expensive on certain edge cases
    *       3. Convert into final time List
    *       o(n+n)
    *   events: Collection<Event> arraylist of events to check through
    *   request: MeetingRequest, the request that holds attendees and duration
    **/
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        // Converts to arraylist for sorting in the future
        List<Event> sortedEvent = new ArrayList<Event>(events);

        // Saves request time for later
        Collection<String> requestAtt = request.getAttendees();
        requestTime = (int) request.getDuration();
        // Uses sort override to sort by ascending order
        Collections.sort(sortedEvent, Event.ORDER_BY_START);
        // checks for valid duration and empty event edge cases
        if(!isValidDuration((int) request.getDuration())) {
            return Arrays.asList();        
        } else if(events.isEmpty()) {
            return Arrays.asList(TimeRange.WHOLE_DAY);
        }
        ArrayList<String> requestAttTester = new ArrayList<String>();
        ArrayList<String> totalAttendance = new ArrayList<String>();
        totalAttendance.addAll(request.getAttendees());
        totalAttendance.addAll(request.getOptionalAttendees());
        for(Event event : sortedEvent) {
            requestAttTester.addAll(event.getAttendees());
        }
        requestAttTester.retainAll(totalAttendance);
        if(requestAttTester.size() == 0) {
            if(tryTwo) {
                return Arrays.asList();
            }
            return Arrays.asList(TimeRange.WHOLE_DAY);
        }
        // ArrayLists to support inverted and final time slots
        ArrayList<TimeRange> finalTimeRange = new ArrayList<TimeRange>();
        ArrayList<TimeRange> invertedTimeRange =  new ArrayList<TimeRange>();
        
        TimeRange tempRange = null;

        // Checks to see if the first event is right at time 0, if so it won't do anything and wait for the loop
        // to start, if not, it'll generate a timeslot going to the first sorted event.
        // also makes sure that the attendees are valid.
        if(sortedEvent.get(0).getStart() != 0 && isAttendeeInBoth(sortedEvent.get(0).getAttendees(), requestAtt, request)) {
            tempRange = TimeRange.fromStartEnd(0, sortedEvent.get(0).getStart(), false);
            finalTimeRange.add(tempRange);
            tempRange = null;
        }

        for(int i = 0; i < sortedEvent.size(); i++) {
            // checks to see if attendees are within both the request and event
            if(isAttendeeInBoth(sortedEvent.get(i).getAttendees(), requestAtt, request)) {
                // if the range isn't build already, start it, will be extended later
                if(null == tempRange) {
                    tempRange = TimeRange.fromStartEnd(sortedEvent.get(i).getStart(), sortedEvent.get(i).getEnd(),false);
                } else {
                    // checks to see if the events overlap or contain each other
                    if(doEventsOverlap(tempRange, sortedEvent.get(i).getWhen())) {
                        if(doesContain(tempRange, sortedEvent.get(i).getWhen())) {
                            tempRange.setEnd(lowestEndInContains(tempRange, sortedEvent.get(i).getWhen()), getGreatestEndinContains(tempRange, sortedEvent.get(i).getWhen()) );
                        } else {
                            tempRange = TimeRange.fromStartEnd(tempRange.start(), sortedEvent.get(i).getEnd(),false);
                        }
                    // checks to see if events touch each other
                    } else if(tempRange.end() == sortedEvent.get(i).getStart()) {
                        tempRange = TimeRange.fromStartEnd(tempRange.start(), sortedEvent.get(i).getEnd(),false);
                    } else {
                        // No more edge cases, we can add the inverted time to the timeslot
                        if(null != tempRange) {
                            invertedTimeRange.add(tempRange);
                        }
                        tempRange = TimeRange.fromStartEnd(sortedEvent.get(i).getStart(), sortedEvent.get(i).getEnd(),false);                        
                    }
                }
            }
        }
        // In case we don't find an extra case to extend or overlap with, we can simply add in the range,
        // this would happen on the last cycle.
        if(null != tempRange) {
            invertedTimeRange.add(tempRange);
        }

        // The loop allows for the times to be inverted into the actual time slots for users to schedule in
        for(int i = 0; i < invertedTimeRange.size(); i++) {
            TimeRange time = invertedTimeRange.get(i);

            // used for this type of time slot
            // Events  : |--A--|     
            // Day     : |---------------------|
            // Options :       |---------------|
            if(time.start() == 0) {
                if(invertedTimeRange.size() == 1) {
                    addToArrayList(finalTimeRange, TimeRange.fromStartEnd(time.end(), TimeRange.END_OF_DAY + 1, false));
                } else {
                    addToArrayList(finalTimeRange, TimeRange.fromStartEnd(time.end(), invertedTimeRange.get(i+1).start(), false));
                }

            // used for this type of time slot
            // Events  :                 |--A--|     
            // Day     : |---------------------|
            // Options : |---------------|
            } else if(time.end() == TimeRange.END_OF_DAY + 1) {
                if(invertedTimeRange.size() == 1) {
                    addToArrayList(finalTimeRange, TimeRange.fromStartEnd(0, time.start(), false));
                } else {
                    TimeRange range = TimeRange.fromStartEnd(invertedTimeRange.get(i-1).end() , time.start(), false);
                    if(!finalTimeRange.contains(range))
                        addToArrayList(finalTimeRange, range);
                }
            // used for this type of time slot
            // Events  :       |--A--|     
            // Day     : |---------------------|
            // Options : |-----|     |---------|
            } else {
                if(i == invertedTimeRange.size() - 1) {
                    addToArrayList(finalTimeRange, TimeRange.fromStartEnd(time.end() , TimeRange.END_OF_DAY + 1, false));
                } else {
                    addToArrayList(finalTimeRange, TimeRange.fromStartEnd(time.end() , invertedTimeRange.get(i+1).start(), false));
                }
            }
        }
        if(finalTimeRange.size() == 0 && request.getOptionalAttendees().size() != 0) {
            request.removeOptionalAttendees();
            tryTwo = true;
            return query(events, request);
        }
        return finalTimeRange;
    }

    /**
    *   isAttendeeInBoth returns a boolean if there are atteendees in both the request and given event
    *   if there is, that means it is an event we should be making sure is accounted for
    *   Collection<String> a: first Collection to check through
    *   Collection<String> b: second Collection to check through
    *   return: true if there are common attendees, false if there is none.
    */
    private boolean isAttendeeInBoth(Collection<String> a, Collection<String> b, MeetingRequest request) {
        List<String> arr = new ArrayList<String>(a);
        arr.retainAll(b);
        return !arr.isEmpty() || isOptional(a, request);
    }

    private boolean isMandatory(Collection<String> a, Collection<String> b) {
        List<String> arr = new ArrayList<String>(a);
        arr.retainAll(b);
        return !arr.isEmpty();
    }

    private boolean isOptional(Collection <String> a, MeetingRequest request) {
        List<String> arr = new ArrayList<String>(a);
        arr.retainAll(request.getOptionalAttendees());

        return !arr.isEmpty();
    }

    /**
    *   isValidDuration returns a boolean if a given integer is a valid time in a day
    *   int duration: the given duration to check 
    *   return: a boolean reporting if the time period is within a valid day
    */
    private boolean isValidDuration(int duration) {
        return duration <= TimeRange.WHOLE_DAY.duration() && duration >= 0;
    }

    /**
    *   isEventBacktoBack is a helper function that will allow to extension of timeslots if 
    *   events are back to back
    *   a: TimeRange 1 to compare to
    *   b: TimeRange 2 to compare to
    *   return: a boolean (true) if the events are back to back, false if they aren't back to back
    */
    private boolean isEventBacktoBack(TimeRange a, TimeRange b) {
        return a.end() == b.start() || b.end() == a.start();
    }

    /**
    *   doEventsOverlap is a helper function to check if an event overlaps
    *   a: TimeRange 1 to compare to
    *   b: TimeRange 2 to compare to
    *   return: true if they do overlap, false if they don't
    */
    private boolean doEventsOverlap(TimeRange a, TimeRange b) {
        return TimeRange.overlaps(a,b);
    }

    /**
    *   checkIfEventGoesToEnd, checks to see if the event goes to the end of the day
    *   a: TimeRange to check if it goes to the end
    *   return: A boolean if the event goes to the end of the day
    */
    private boolean checkIfEventGoesToEnd(TimeRange a) {
        return a.end() == (TimeRange.END_OF_DAY + 1);
    }

    /**
    *   isEnoughTime is a helper function to see if the time request is enough to fit in the slow
    *   a: TimeRange to check
    *   request: the amount of time that someone wants to meet
    */
    private boolean isEnoughTime(TimeRange a, MeetingRequest request) {
        return a.duration() >= request.getDuration();
    }

    /**
    *   doesContain, is a helper function to check if an event is within another
    *   a: TimeRange 1 to compare to
    *   b: TimeRange 2 to compare to
    *   return: a boolean if they do contain each other
    */
    private boolean doesContain(TimeRange a, TimeRange b) {
        return a.contains(b) || b.contains(a);
    }

    /**
    *   getGreatestEndinContains grabs the outer time if they contain each other, ie:
    *   if we compare 510 and 600, it'll return 600
    *   a: TimeRange 1 to compare to
    *   b: TimeRange 2 to compare to
    *   return: a number containing the greatest end point
    */
    private int getGreatestEndinContains(TimeRange a, TimeRange b) {
        return a.end() > b.end() ? a.end() : b.end();
    }

    /**
    *   lowestEndInContains grabs the lower start time if they contain each other, ie:
    *   if we compare 510 and 600, it'll return 510
    *   a: TimeRange 1 to compare to
    *   b: TimeRange 2 to compare to
    *   return: a number containing the lowest start point
    */
    private int lowestEndInContains(TimeRange a, TimeRange b) {
        return a.start() < b.start() ? a.start() : b.start();
    }

    /**
    *   addToArrayList is a helper function that checks for time duration before adding
    *   a: TimeRange, is the TimeRange we want to add
    *   timeRangeList: the TimeRange List to add the TimeRange to
    */
    private void addToArrayList(ArrayList<TimeRange> timeRangeList, TimeRange a) {
        if(a.duration() >= requestTime) {
            timeRangeList.add(a);
        }
    }
}
