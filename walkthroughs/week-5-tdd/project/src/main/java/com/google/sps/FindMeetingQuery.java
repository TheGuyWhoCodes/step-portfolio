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
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        // Converts to arraylist for sorting in the future
        List<Event> sortedEvent = new ArrayList<Event>(events);

        // Uses sort override to sort by ascending order
        Collections.sort(sortedEvent, Event.ORDER_BY_START);

        // checks for valid duration and empty event edge cases
        if(!isValidDuration((int) request.getDuration())) {
            return Arrays.asList();        
        } else if(events.isEmpty()) {
            return Arrays.asList(TimeRange.WHOLE_DAY);
        }

        ArrayList<TimeRange> finalTimeRange = new ArrayList<TimeRange>();
        Collection<String> requestAtt = request.getAttendees();
        TimeRange tempRange = null;

        // Checks to see if the first event is right at time 0, if so it won't do anything and wait for the loop
        // to start, if not, it'll generate a timeslot going to the first sorted event.
        // also makes sure that the attendees are valid.
        if(sortedEvent.get(0).getStart() != 0 && isAttendeeInBoth(sortedEvent.get(0).getAttendees(), requestAtt)) {
            tempRange = TimeRange.fromStartEnd(0, sortedEvent.get(0).getStart(), false);
            finalTimeRange.add(tempRange);
            tempRange = null;
        }

        for(int i = 0; i < sortedEvent.size(); i++) {
            // Checks to see if there is an overlap in attendees
            if(isAttendeeInBoth(sortedEvent.get(i).getAttendees(), requestAtt)) {
                // if we don't have a current tempRange we are working with, create a new one
                if(null == tempRange){
                    tempRange = TimeRange.fromStartEnd(sortedEvent.get(i).getStart(), sortedEvent.get(i).getEnd(),false);
                } else {
                    if(doEventsOverlap(tempRange, sortedEvent.get(i).getWhen())) {
                        // Do the events overlap? If so we need to extend the timerange to the end of the new event
                        if(doesContain(tempRange, sortedEvent.get(i).getWhen())) {
                            tempRange.setEnd(lowestEndInContains(tempRange, sortedEvent.get(i).getWhen()), getGreatestEndinContains(tempRange, sortedEvent.get(i).getWhen()) );
                        } else {
                            tempRange.setEnd(tempRange.start(), sortedEvent.get(i).getEnd());
                        }
                    } else if(isEventBacktoBack(tempRange, sortedEvent.get(i).getWhen())) {
                        // Are the events back to back? If so we need to extend the end time
                        tempRange.setEnd(tempRange.start(), sortedEvent.get(i).getEnd());
                    } else {
                        // Since there is no overlap, we can calculate the final timeslot
                        if(i == sortedEvent.size() - 1) {
                            if(sortedEvent.get(i).getEnd() == (TimeRange.END_OF_DAY + 1)) {
                                tempRange.setEnd(tempRange.end(), sortedEvent.get(i).getStart());   
                            } else {
                                tempRange.setEnd(tempRange.end(), sortedEvent.get(i).getStart());   
                                finalTimeRange.add(TimeRange.fromStartEnd(sortedEvent.get(i).getEnd(), TimeRange.END_OF_DAY + 1, false));
                            }                         
                        } else {
                            tempRange.setEnd(tempRange.end(), sortedEvent.get(i + 1).getStart());                      
                        }
                        if(!checkIfEventGoesToEnd(tempRange) && !doEventsOverlap(tempRange, sortedEvent.get(i).getWhen()) && isEnoughTime(tempRange, request)) { 
                            finalTimeRange.add(tempRange);
                        }
                        tempRange = null;  
                    }
                }
            } else {
                if(i == sortedEvent.size() - 1 && finalTimeRange.size() == 0) {
                    finalTimeRange.add(TimeRange.WHOLE_DAY);
                } 
            }
        }

        // If we never added in the last range into our list, this means we never got a closure.
        // meaning the time could last till the end of the day
        if(null != tempRange) {
            tempRange.setEnd(tempRange.end(), TimeRange.END_OF_DAY + 1);   
            finalTimeRange.add(tempRange);
        }

        // Need this extra sort, the tests require events to come back in order
        Collections.sort(finalTimeRange, TimeRange.ORDER_BY_START);        
        return finalTimeRange;
    }

    /**
    *   isAttendeeInBoth returns a boolean if there are atteendees in both the request and given event
    *   if there is, that means it is an event we should be making sure is accounted for
    *   Collection<String> a: first Collection to check through
    *   Collection<String> b: second Collection to check through
    *   return: true if there are common attendees, false if there is none.
    */
    private boolean isAttendeeInBoth(Collection<String> a, Collection<String> b) {
        List<String> arr = new ArrayList<String>(a);
        arr.retainAll(b);
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
    *   doEventsOverlap is a helper function to check 
    *
    *
    */
    private boolean doEventsOverlap(TimeRange a, TimeRange b) {
        return TimeRange.overlaps(a,b);
    }

    private boolean checkIfEventGoesToEnd(TimeRange a) {
        return a.end() == (TimeRange.END_OF_DAY + 1);
    }

    private boolean isEnoughTime(TimeRange a, MeetingRequest request) {
        return a.duration() >= request.getDuration();
    }

    private boolean doesContain(TimeRange a, TimeRange b) {
        return a.contains(b) || b.contains(a);
    }

    private int getGreatestEndinContains(TimeRange a, TimeRange b) {
        return a.end() > b.end() ? a.end() : b.end();
    }

    private int lowestEndInContains(TimeRange a, TimeRange b) {
        return a.end() < b.end() ? a.end() : b.end();
    }
}
