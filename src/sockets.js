let usersConnected = 0;

module.exports = (io) => {
	io.on('connect', (socket) => {
		usersConnected++;
		io.emit('User_Activity', usersConnected);
		socket.broadcast.emit('user connected', true);
		console.log('NEW USER CONNECTED');
		socket.on('submit message', (msg, usuarioEnviado) => {
			socket.broadcast.emit('Add_New_Message', msg, usuarioEnviado);
			socket.broadcast.emit('Play_Notification', msg, usuarioEnviado);
		});
		socket.on('disconnect', () => {
			usersConnected--;
			io.emit('User_Activity', usersConnected);
			socket.broadcast.emit('user connected', false);
			console.log('USER DISCONNECTED');
		});
	});
};
