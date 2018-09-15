drop database if exists friendfinder_db;

create database friendfinder_db;

use friendfinder_db;

CREATE TABLE survey(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  q0 INT NOT NULL,
  q1 INT NOT NULL,
  q2 INT NOT NULL,
  q3 INT NOT NULL,
  q4 INT NOT NULL,
  q5 INT NOT NULL,
  q6 INT NOT NULL,
  q7 INT NOT NULL,
  q8 INT NOT NULL,
  q9 INT NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO survey (username, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9)
VALUES
("FouXo", 1,1,1,1,1,1,1,1,1,1),
("AlexV", 2,4,2,4,2,4,2,4,2,4),
("Sasuke", 5,5,5,5,5,5,5,5,5,5),
("Marujin", 4,2,4,2,4,2,4,2,4,2);

SELECT * FROM survey;

