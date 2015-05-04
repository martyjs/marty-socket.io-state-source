var io = require('socket.io-client');

function socketStateSource() {
  return {
    open: function () {
      if (this.socket) {
        return;
      }

      this.socket = io(this.url);
      Object.keys(this.events).forEach(function (event) {
        var handler = this.events[event];

        if (!handler) {
          throw new Error('Could not find ' + handler + ' event handler');
        }

        this.socket.on(event, this[handler].bind(this));
      }, this);
    }
  };
}

module.exports = socketStateSource;