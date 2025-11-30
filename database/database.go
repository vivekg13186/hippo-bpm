package database

import (
	"hippo-bpm/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(sqlite.Open("accounts.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Auto migrate tables
	err = db.AutoMigrate(&models.Account{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = db
}
