DROP DATABASE hscore;
CREATE DATABASE hscore;

USE hscore;

CREATE TABLE score (
  id int(11) NOT NULL AUTO_INCREMENT,
  score int(11) DEFAULT NULL,
  player char(3) DEFAULT NULL,
  scoredate datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE blacklist (
  bid int(11) NOT NULL AUTO_INCREMENT,
  word char(3) DEFAULT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO blacklist (word) values ("kuk");
INSERT INTO blacklist (word) values ("k*k");
#INSERT INTO score (score, player, scoredate) values (1500, "TST", NOW());

