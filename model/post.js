module.exports = (Seq, DataType) => {
	let postModel = Seq.define("post", {
		id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		postHeaderText: {
			type: DataType.STRING,
			allowNull: false
		},
		postDetails: {
			type: DataType.STRING, 
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

	return postModel;
};