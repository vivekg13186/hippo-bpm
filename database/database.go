package database

import (
	"hippo-bpm/models"
	"log"
	"os"
	"path/filepath"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// Get user home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatal("Cannot get user home directory:", err)
	}

	// Create an app-specific folder
	appDir := filepath.Join(homeDir, ".account_explorer")
	if err := os.MkdirAll(appDir, os.ModePerm); err != nil {
		log.Fatal("Cannot create app directory:", err)
	}

	// Database file path
	dbPath := filepath.Join(appDir, "accounts.db")

	// Connect to SQLite
	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	// Auto-migrate tables
	if err := db.AutoMigrate(&models.Account{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = db
	log.Println("Database created at:", dbPath)
}
