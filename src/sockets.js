module.exports = (io) => {
	io.on('connect', (socket) => {
		console.log('NEW USER CONNECTED');
		socket.on('submit message', (msg) => {
			socket.broadcast.emit('Add_New_Message', msg);
		});
		socket.on('disconnect', () => {
			console.log('USER DISCONNECTED');
		});
	});
};
