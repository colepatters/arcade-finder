import {
	DataTypes,
	Model,
	Sequelize,
	type CreationOptional,
	type InferAttributes,
	type InferCreationAttributes
} from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.sqlite'
});

export class Arcade extends Model<InferAttributes<Arcade>, InferCreationAttributes<Arcade>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare street_address: string;

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
	declare id: CreationOptional<number>;
	declare name: string;

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

export class Song extends Model<InferAttributes<Song>, InferCreationAttributes<Song>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare artist: string;

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

export class Score extends Model<InferAttributes<Score>, InferCreationAttributes<Score>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare score: number;

	declare created_at: CreationOptional<Date>;
	declare updated_at: CreationOptional<Date>;
}

Arcade.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		street_address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	},
	{
		sequelize,
		timestamps: true,
		tableName: 'arcades',
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
);

Game.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	},
	{
		sequelize,
		timestamps: true,
		tableName: 'games',
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
);

Game.belongsToMany(Arcade, { through: 'arcade_games' });
Arcade.belongsToMany(Game, { through: 'arcade_games' });

await sequelize.authenticate();
await sequelize.sync({ force: true });

export default sequelize;
