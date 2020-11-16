const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addRole = functions.https.onCall(async (ref) => {
	const managerID = '3Y5WQRCdcctECuaK96Zh';
	const employeeID = 'mhPxVmeFpjlNGaDhAQvA';
	if (ref.type == 'manager') {
		let roleRef = admin.firestore().doc('roles/' + managerID);
		await admin.firestore().collection('users').doc(ref.userId).update({ role: roleRef });
	} else if (ref.type == 'employee') {
		let roleRef = admin.firestore().doc('roles/' + employeeID);
		await admin.firestore().collection('users').doc(ref.userId).update({ role: roleRef });
	}
});
