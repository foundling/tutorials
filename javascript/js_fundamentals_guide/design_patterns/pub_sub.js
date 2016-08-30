var q = {};

var pubsub = (function(q){

    var uuid = -1;

    function publish(topic, data) {

        if (!q[topic]) {
            return;
        }

        var numSubscribers = q[topic].length;

        while (numSubscribers) {
            numSubscribers--;
            q[topic].fn(topic, data);
        }
    }

    function subscribe(topic, fn) {

        var token;

        if (!q[topic]) {
            q[topic] = [];
        } 

        token = (++uuid).toString();
        q[topic].push({
            token:  token,
            fn:     fn,
        });

        return token;
    }

    function unsubscribe(token) {

        var i, topic;
        for (topic in q) {

            if ( q.hasOwnProperty(topic) && q[topic] ) {
                for (i = 0, max = q[topic].length; i < max; ++i) {
                    if (q[topic][i].token === token) {
                        q[topic].splice(i, 1);        
                        return token;
                    }
                }
            }

        } 
    }

}());
