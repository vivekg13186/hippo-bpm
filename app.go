package main

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetUrl(url, username, password, domain string) (string, error) {
	// Create new request
	//fmt.Print(url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	// Add custom headers
	req.Header.Add("Accept", "application/json")

	auth := username + ":" + password
	//fmt.Println("User name:password", auth)
	encodedAuth := base64.StdEncoding.EncodeToString([]byte(auth))
	//fmt.Println("Encoded Auth:", encodedAuth)

	req.Header.Add("Authorization", domain+" "+encodedAuth)
	//fmt.Println("Authorization Header:", req.Header.Get("Authorization"))
	// No domain specified, use basic auth

	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}

	resp, err := client.Do(req)
	if err != nil {
		//fmt.Println("Error making request:", err)
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		//fmt.Println("Error reading response body:", err)
		return "", err
	}

	return string(body), nil
}
func (a *App) PostUrl(url, username, password, domain string, jsonBody string) (string, error) {
	// Create request body
	reqBody := bytes.NewBuffer([]byte(jsonBody))

	// Create new POST request
	req, err := http.NewRequest("POST", url, reqBody)
	if err != nil {
		return "", err
	}

	// Add headers
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")

	// Authentication
	auth := username + ":" + password
	//fmt.Println("User name:password", auth)

	encodedAuth := base64.StdEncoding.EncodeToString([]byte(auth))
	//fmt.Println("Encoded Auth:", encodedAuth)

	// Custom auth header just like your GET version
	req.Header.Add("Authorization", domain+" "+encodedAuth)

	// Create HTTP client that ignores SSL issues
	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}

	// Perform POST request
	resp, err := client.Do(req)
	if err != nil {
		//fmt.Println("Error making request:", err)
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		//fmt.Println("Error reading response body:", err)
		return "", err
	}

	return string(body), nil
}
func (a *App) PostWithQuery(urlString, username, password, domain string) (string, error) {

	//fmt.Println("URL:", urlString)
	// Create request (POST)
	req, err := http.NewRequest("POST", urlString, nil)
	if err != nil {
		//fmt.Println("Error", err)
		return "", err
	}

	// Headers
	req.Header.Set("Accept", "application/json")

	// Authentication
	auth := username + ":" + password
	//fmt.Println("User name:password", auth)

	encodedAuth := base64.StdEncoding.EncodeToString([]byte(auth))
	//fmt.Println("Encoded Auth:", encodedAuth)

	// Custom auth header just like your GET version
	req.Header.Add("Authorization", domain+" "+encodedAuth)
	//fmt.Println("Authorization Header:", req.Header.Get("Authorization"))

	// Ignore SSL certificate issues
	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}

	// Execute
	resp, err := client.Do(req)
	if err != nil {
		//fmt.Println("Error making request:", err)
		return "", err
	}
	defer resp.Body.Close()

	// Read body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		//fmt.Println("Error reading response body:", err)
		return "", err
	}

	return string(respBody), nil
}
