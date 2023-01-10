const upload = async(to, next) => {
	// res.status(500).send({
	// 	message: 'Upload ok !'
	// });
	console.log(to);
	next();
};

const download = async(to, next) => {
	next();
};

export {upload, download};