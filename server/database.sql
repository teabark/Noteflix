CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20),
    note TEXT
);

INSERT INTO notes (title, note)
VALUES ('Kenya Independence', 'Kenya gained independence in 1963. Jomo Kenyatta took over as the first Prime Minister of Kenya');