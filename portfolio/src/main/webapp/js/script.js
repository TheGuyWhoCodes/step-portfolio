let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let endpoint = '/data'
let deleteSingleCommentEndpoint = '/deleteSingleComment'
let deleteAllCommentsEndpoint = '/deleteAllComments'

let renderer = new THREE.WebGLRenderer();
let container = document.getElementById('world');
let w = container.offsetWidth;
let h = container.offsetHeight;
let comments = [];
let cursor = "";

renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxBufferGeometry(3, 2, 2, 3, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: "#0F9D58",
    wireframe: true,
  });
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;


var animate = function () {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render( scene, camera );
    window.addEventListener('resize',handleWindowResize,false);
};

// a listener whenever the window gets resized, allows for the three.js
// window to not distort.
var handleWindowResize = function () {
    // update height and width of the renderer and the camera
	WIDTH = container.offsetWidth;
	HEIGHT = container.offsetHeight;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}
animate();

/**
 * the validateForm function checks to see if there is a valid name and
 * and comment response from the user, if so it'll return true
 * if not, it'll return false
 */
function validateForm() {
	var name = document.forms["comments"]["name"].value;
	var comment = document.forms["comments"]["comment"].value;
    if (name == "") {
        $('#response').text("You need to fill out your name!")
        $('#myModal').modal()
        return false;
    } else if(name.length >= 50) {
        $('#response').text("You cannot have a name over 50 characters")
        $('#myModal').modal()
        return false;
    } else if(comment == "") {
        $('#response').text("You cannot have an empty message")
        $('#myModal').modal()
        return false
    }
    return true;
}

/**
 * submitCommentForm uses a POST request to submit form data, instead of the PHP form submit.
 * Though, this is techincally a weird POST request, because we are using query params and NOT
 * a proper body request.
 */
function submitCommentForm() {
    if(validateForm()) {

        let photo = document.getElementById("image-file").files[0];  // file from input
        let formData = new FormData();
        formData.append("image", photo);                                
        formData.append("name", document.forms["comments"]["name"].value)
        formData.append("comment", document.forms["comments"]["comment"].value);
        formData.append("cursor", cursor);

        disableButton();
        var xhr = new XMLHttpRequest();
        fetch('/blobstore-upload-url').then((response) => {
            return response.text();
        }).then((imageUploadUrl) => {
            xhr.open('POST', imageUploadUrl, true);
            xhr.send(formData);
            xhr.onload = function() {
                // Good response
                if(xhr.status == 200) {
                    $('#response').text("Successfully posted your comment!")
                    $('#myModal').modal()
                    enableButton();
                    fetchComments();
                } else {
                    $('#response').text("Unable to submit your comment, try again later!")
                    $('#myModal').modal()
                    enableButton();
                }
            }
        });
    }
}

loadMoreComments = function() {
    var amount = {
        amount: document.getElementById( "comment-amount" ).value,
        cursor: cursor
    }	
    fetch(endpoint + formatParams(amount)).then(e => e.json()).then((resp) => {
        comments += resp["comments"];
        cursor = resp["cursor"];
        if(resp["comments"].length == 0) {
            document.getElementById("load-more").style.display = "none";
        }
        for(comment of resp["comments"]) {
            commentSection = document.getElementById("raw-comments");
            // Creates the new comment div class to append
            let newComment = document.createElement("div")
            newComment.classList.add("comment")

            // The actual html, uses the string formatting tool to append it
            newComment.innerHTML = (`
            	<button class="btn btn-primary delete" onclick='deleteComment("${comment["id"]}")'>
                    <i class="fas fa-trash-alt"></i>
                </button> 
                <b>${comment['name']}</b> wrote ${comment['comment']}
                <br><small>This commenter is feeling: ${returnFeelingEmoji(comment["score"])}</small>
            `)
            commentSection.appendChild(newComment)
        }
    })
}

enableButton = function() {
    $("#btn-submit").prop("disabled", false);
    $("#btn-submit").html(`Submit`);
}

disableButton = function() {
    $("#btn-submit").prop("disabled", true);
    $("#btn-submit").html(`<span id = "loader" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting Comment...`);
}

// Used to prevent default redirect behavior
$('#comments').submit(function (evt) {
   evt.preventDefault();
});

window.onload = () => {
	fetchComments();
    // getEStatstic();
}

// fetch comments is used to GET comments from our API
// appends the results over to the html
fetchComments = function () {
    var amount = {
        amount: document.getElementById( "comment-amount" ).value,
        cursor: ""
    }	
    document.getElementById("raw-comments").innerHTML = '<span id = "loader" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    fetch(endpoint + formatParams(amount)).then(e => e.json()).then((resp) => {
        comments = resp["comments"];
        cursor = resp["cursor"];
        if(resp["comments"].length == 0) {
            document.getElementById("load-more").style.display = "none";
        }
        for(comment of comments) {
            commentSection = document.getElementById("raw-comments");
            // Creates the new comment div class to append
            let newComment = document.createElement("div")
            newComment.classList.add("comment")

            // The actual html, uses the string formatting tool to append it
            newComment.innerHTML = (`
            	<button class="btn btn-primary delete" onclick='deleteComment("${comment["id"]}")'>
                    <i class="fas fa-trash-alt"></i>
                </button> 
                <b>${comment['name']}</b> wrote ${comment['comment']}
                <br><small>This commenter is feeling: ${returnFeelingEmoji(comment["score"])}</small>
            `)
            if(comment["image"] != null) {
                let commentImage = document.createElement("img");
                commentImage.src = comment["image"];
                newComment.appendChild(commentImage);
            }
            commentSection.appendChild(newComment)
        }
        document.getElementById("loader").remove();
    })
}

returnFeelingEmoji = function(score) {
    if(score > .2) {
        return `😃 ${score}`
    } else if(score < -.2) {
        return `😡 ${score}`
    } else {
        return `😐 ${score}`
    }
}

getEStatstic = function() {
    fetch('/getNumberofE').then(e => e.json()).then((response) => {
        document.getElementById("e-stat").textContent = (response["commentsWithoutE"]);
    })
}

deleteComment = function(id) {
    var idHash = {
        id: id
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', deleteSingleCommentEndpoint + formatParams(idHash), true);
    // Need to use this request header in order for servelet to read in values
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(null);
    xhr.onload = function() {
        if(xhr.status == 200) {
            $('#response').text("Successfully deleted your comment!!")
            $('#myModal').modal()
            fetchComments();
        } else {
            $('#response').text("Unable to delete your comment, try again later!")
            $('#myModal').modal()
        }
    }
}

deleteAllComments = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', deleteAllCommentsEndpoint, true);
    // Need to use this request header in order for servelet to read in values
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(null);
    xhr.onload = function() {
            if(xhr.status == 200) {
                $('#response').text("Successfully deleted all comments!!")
                $('#myModal').modal()
    	        fetchComments();
            } else {
                $('#response').text("Unable to delete all comments, try again later!")
                $('#myModal').modal()
            }
    }
}

/*
** a helper function used to parse a dictionary to query params
** ie ?test=test&and=and
** params: dictionary object to translate to query param
*/
function formatParams( params ){
  return "?" + Object
    .keys(params)
    .map(function(key){
        return key+"="+encodeURIComponent(params[key])
    })
    .join("&")
}