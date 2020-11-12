const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addRoletoManager = functions.firestore.document('/users/{userId}').onCreate(async (snap, context) => {
	const managerID = '3Y5WQRCdcctECuaK96Zh';

	let roleRef = admin.firestore().doc('roles/' + managerID);
	await admin.firestore().collection('users').doc(context.params.userId).update({ role: roleRef });
});
