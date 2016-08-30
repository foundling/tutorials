function PubSub() {

    var q = {};
    var topics = {};
    var uuid = -1;
    
    function publish(topic, data) {

        if (!topics[topic]) {
            return;
        }

        var subscribers = topics[topic];
        for (var i = 0, max = subscribers.length; i < max; ++i) {
            subscribers[i].fn(topic, data);
        }
        
    }

    function subscribe(topic, fn) {
        
        var token = ++uuid;

        if (!topics[topic]) {
            topics[topic] = [];
        }

        topics[topic].push({
            token: token,
            fn: fn
        });
        
        return token; 
    }

    function unsubscribe(token) {
        var i;
        var topic;

        for (topic in topics) {
            if (topics.hasOwnProperty[topic] && topics[topic]) {
                for (i = 0, max = topics[topic].length; i < max; ++i) {
                    if (topics[topic][i].token === token) {
                        topics[topic][i].splice(i,1);
                        return token;
                    }
                }
            }
        }
        return token;
    }

    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
}

var pubSub = new PubSub();
