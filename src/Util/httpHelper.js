import axios from 'axios';

const HttpHelper = (url, method, reqData, callback) => {
console.log("inside HttpHelper .. ,url = "+url);
        if (method.toLowerCase() == 'post') {
            if (reqData == undefined) {
                reqData = {};
            }
            var config = {
                headers: { 'Content-Type': 'application/json' }
            };
            return axios.post(url, reqData, config)
            .then(function (response) {
              console.log('response='+response);
              callback(null, response)
              return response;

            })
           .catch(function(err) {
             console.log("err="+err.message);
             callback(null, err)
             return err;

           })
        }
        else {
            var config = {
                headers: { 'Content-Type': 'application/json' }
            };
            return axios.get(url, config)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.data);
                        return response.data;
                    } else {
                        alert("Error while Fetching data");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
}

export default HttpHelper;
