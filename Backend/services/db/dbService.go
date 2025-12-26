package db

import (
	"fmt"

	"github.com/AmanKoua/huntboard/models/entity"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "postgres"
)

type Service struct {
	Db *gorm.DB
}

func New() *Service {
	db := initializeDbConnection()
	autoMigrateModels(db)
	return &Service{db}
}

func initializeDbConnection() *gorm.DB {

	dbSourceName := fmt.Sprintf(
		`host=%s
		 port=%d
		 user=%s
    	 password=%s
		 dbname=%s
		sslmode=disable`,
		host, port, user, password, dbname)

	db, err := gorm.Open(postgres.Open(dbSourceName), &gorm.Config{})

	if err != nil {
		panic(fmt.Errorf("failed to connect to Db: %w", err))
	}

	return db

}

func autoMigrateModels(db *gorm.DB) {

	err := db.AutoMigrate(&entity.Profile{})
	err = db.AutoMigrate(&entity.JobTitle{})
	err = db.AutoMigrate(&entity.JobListing{})

	if err != nil {
		panic(err)
	}

}
