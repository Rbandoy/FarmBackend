module.exports = (Seq, DataType) => {
	let bookmarkModel = Seq.define("bookmarks", {
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
		userid: {
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

	return bookmarkModel;
};