// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Current user
var uid;