DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
	id SERIAL PRIMARY KEY,
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION
);

INSERT INTO locations (latitude, longitude) VALUES 
(
	37.8267, -122.4233
),
(
	40.7128, 74.0060
);