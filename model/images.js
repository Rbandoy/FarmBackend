module.exports = (Seq, DataType) => {
	let imageModel = Seq.define("images", {
		id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
    postId: {
			type: DataType.STRING,
			allowNull: false
		},
		image: {
			type: DataType.STRING,
			allowNull: false
		},
		status: {
			type: DataType.STRING,  
      allowNull: false,
		}, 
	}, {
		freezeTableName: true
	});

	return imageModel;
};