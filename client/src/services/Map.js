export default {

  
    getLocation: function (handleResults) {
    return navigator.geolocation.getCurrentPosition(function (position) {
        
        handleResults(position);
       
    })
}
};
