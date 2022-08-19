module.exports = (Seq, DataType) => {
	let commentModel = Seq.define("comments", {
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
		commentDetails: {
			type: DataType.STRING,
			allowNull: false
		},
		userId: {
			type: DataType.STRING, 
			allowNull: false,  
		},
		status: {
			type: DataType.STRING,  
      allowNull: false,
		}, 
	}, {
		freezeTableName: true
	});

	return commentModel;
};