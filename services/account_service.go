package services

import (
	"hippo-bpm/database"
	"hippo-bpm/models"
)

// AccountService struct exposed to Wails
type AccountService struct{}

// GetAllAccounts returns all accounts
func (s *AccountService) GetAllAccounts() ([]models.Account, error) {
	var accounts []models.Account
	result := database.DB.Find(&accounts)
	return accounts, result.Error
}

// CreateAccount adds a new account
func (s *AccountService) CreateAccount(acc models.Account) error {
	return database.DB.Create(&acc).Error
}

// DeleteAccount removes an account by ID
func (s *AccountService) DeleteAccount(id uint) error {
	return database.DB.Delete(&models.Account{}, id).Error
}
