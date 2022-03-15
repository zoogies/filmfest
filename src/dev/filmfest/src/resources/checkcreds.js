import basicxhr from "./xhr";

export default function checkcreds(){
    return new Promise(function (resolve, reject) {
        const epochdiff = window.localStorage.getItem("gerdyexpires") - Math.round(Date.now()/1000);
        if(epochdiff <=  0){ //if epoch is literally expired
            window.localStorage.clear();
            window.location.href = "http://localhost:3000/login"
        }
        else if(epochdiff <= 3600){ //if our current epoch is less than or equal to an hour away from our auth tokens expiration
            //could cross check the expire time here for even more security but redundant
            basicxhr("refreshkey",{"id":window.localStorage.getItem('gerdyid'),"key":window.localStorage.getItem('gerdykey')}).then(
                function (response){
                    if(response === 'wrong'){
                        window.localStorage.clear();
                        window.location.href = "http://localhost:3000/login"
                    }
                    else{
                        const key = JSON.parse(response)['key']
                        const expires = JSON.parse(response)['expires']
                        window.localStorage.setItem('gerdykey',key);
                        window.localStorage.setItem('gerdyexpires',expires);
                        resolve();
                    }
                }
            )
        }
        else{
            resolve();
        }
    });
}

