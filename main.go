package main

import (
	"embed"
	"hippo-bpm/database"
	"hippo-bpm/services"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	database.Connect() // initialize SQLite DB

	account := &services.AccountService{}

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "hippo-bpm",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			account,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
