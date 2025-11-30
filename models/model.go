package models

type Account struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	Title      string `json:"title"`
	URL        string `json:"url"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	AuthDomain string `json:"authDomain"`
	ZenApiKey  string `json:"zenApiKey"`
}
