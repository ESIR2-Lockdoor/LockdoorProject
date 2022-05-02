-- MySQL Script generated by MySQL Workbench
-- Mon Mar 28 18:07:48 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`USERS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`USERS` (
  `idUSERS` INT NOT NULL AUTO_INCREMENT,
  `USER_FirstName` VARCHAR(45) NULL,
  `USER_LastName` VARCHAR(45) NOT NULL,
  `USER_Pseudo` VARCHAR(45) NOT NULL,
  `USER_Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUSERS`),
  UNIQUE INDEX `USER_ID_UNIQUE` (`USER_Pseudo` ASC) VISIBLE,
  UNIQUE INDEX `idUSERS_UNIQUE` (`idUSERS` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`DOORS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DOORS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`DOORS` (
  `idDOOR` INT NOT NULL AUTO_INCREMENT,
  `DOOR_OwnerID` INT NOT NULL,
  `DOOR_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDOOR`),
  UNIQUE INDEX `idDOOR_UNIQUE` (`idDOOR` ASC) VISIBLE,
  UNIQUE INDEX `DOOR_OwnerID_UNIQUE` (`DOOR_OwnerID` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`HISTORICAL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HISTORICAL` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`HISTORICAL` (
  `USERS_idUSERS` INT NOT NULL,
  `DOORS_idDOOR` INT NOT NULL,
  `HISTO_ACTION` VARCHAR(45) NOT NULL,
  `HISTO_TIME` DATETIME NOT NULL,
  PRIMARY KEY (`USERS_idUSERS`, `DOORS_idDOOR`),
  INDEX `fk_USERS_has_DOORS_DOORS1_idx` (`DOORS_idDOOR` ASC) VISIBLE,
  INDEX `fk_USERS_has_DOORS_USERS1_idx` (`USERS_idUSERS` ASC) VISIBLE,
  CONSTRAINT `fk_USERS_has_DOORS_USERS1`
    FOREIGN KEY (`USERS_idUSERS`)
    REFERENCES `mydb`.`USERS` (`idUSERS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USERS_has_DOORS_DOORS1`
    FOREIGN KEY (`DOORS_idDOOR`)
    REFERENCES `mydb`.`DOORS` (`idDOOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`AUTHORISATIONS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`AUTHORISATIONS` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`AUTHORISATIONS` (
  `USERS_idUSERS` INT NOT NULL,
  `DOORS_idDOOR` INT NOT NULL,
  `AUTHO_Name` VARCHAR(45) NULL,
  PRIMARY KEY (`USERS_idUSERS`, `DOORS_idDOOR`),
  INDEX `fk_USERS_has_DOORS_DOORS2_idx` (`DOORS_idDOOR` ASC) VISIBLE,
  INDEX `fk_USERS_has_DOORS_USERS2_idx` (`USERS_idUSERS` ASC) VISIBLE,
  CONSTRAINT `fk_USERS_has_DOORS_USERS2`
    FOREIGN KEY (`USERS_idUSERS`)
    REFERENCES `mydb`.`USERS` (`idUSERS`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USERS_has_DOORS_DOORS2`
    FOREIGN KEY (`DOORS_idDOOR`)
    REFERENCES `mydb`.`DOORS` (`idDOOR`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;