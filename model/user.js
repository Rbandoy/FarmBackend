module.exports = (Seq, DataType) => {
	let userModel = Seq.define("user", {
		id: {
			type: DataType.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		fname: {
			type: DataType.STRING,
			allowNull: false
		},
		mname: {
			type: DataType.STRING, 
		},
		lname: {
			type: DataType.STRING, 
			allowNull: false,  
		},
		email: {
			type: DataType.STRING,  
      allowNull: false,
		},
    contactNo: {
      type: DataType.STRING,
      allowNull: false
    },
    username: {
      type: DataType.STRING,
      allowNull: false
    }, 
    password: {
      type: DataType.STRING,
      allowNull: false
    },
		password: {
      type: DataType.STRING,
      allowNull: false
    },
		image: {
      type: DataType.STRING,
      allowNull: false
    },
		role: {
      type: DataType.STRING,
      allowNull: false
    },
	}, {
		freezeTableName: true
	});

	return userModel;
};