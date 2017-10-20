DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION
);

INSERT INTO locations (name, latitude, longitude) VALUES
(
	'somewhere', 37.8267, -122.4233
),
(
	'new york', 40.7128, 74.0060
);
