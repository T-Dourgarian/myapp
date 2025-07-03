CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	username VARCHAR(40)
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
	name VARCHAR(40),
    start_day TIMESTAMP,
    end_day TIMESTAMP,
    from_user_id INT REFERENCES users(id)
);

CREATE TABLE day_types (
    name VARCHAR PRIMARY KEY
);

CREATE TABLE days (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR REFERENCES day_types(name),
    trip_id INT REFERENCES trips(id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    location VARCHAR,
    duration_days int,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    day_id INT REFERENCES days(id)
);

CREATE TABLE tag_types (
    name VARCHAR PRIMARY KEY
);

CREATE TABLE event_tags (
    tag_name VARCHAR REFERENCES tag_types(name),
    event_id INT REFERENCES events(id),
    PRIMARY KEY (tag_name, event_id)
);

CREATE TABLE event_items (
    id SERIAL PRIMARY KEY,
    description TEXT,
    event_id INT REFERENCES events(id)
);
