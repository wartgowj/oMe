export default {
getRates: function(){
    const app_id = '22bc894b9e8c4f72bc52e4b35a237c08';
    return fetch('https://openexchangerates.org/api/latest.json?app_id=' + app_id)
}  
}




    
