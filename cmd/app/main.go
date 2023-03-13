package main

import (
	"context"
	"fmt"
	"time"

	"github.com/Bukhashov/med_uchet/api/v1/rest"
	"github.com/Bukhashov/med_uchet/internal/inits"
	"github.com/Bukhashov/med_uchet/pkg/client/postgresql"
	"github.com/Bukhashov/med_uchet/pkg/logging"

	"github.com/Bukhashov/med_uchet/configs"
)

func main(){
	logger := logging.GetLogger()
	cfg := configs.GetConfig()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	// Деректер қорымен байланыс орнатылады
	postgresClient, err := postgresql.NewClient(ctx, cfg.Storage); if err != nil {
		panic("database not connect")
	}
	// Деректер қорындағы таблицаларды инициализациялар
	// Егер деректер қорында [users, confirm] таблицалары жоқ болған жағдайда жаңадан құрынлады
	initTables := inits.NewInit(postgresClient)
	if err = initTables.CreateTables(ctx); err != nil {
		panic("Erorrs in create tabls")
	}
	fmt.Print("Create tables");
	
	RestApi := rest.NewRest(cfg, &logger, postgresClient)
	// REST API
	RestApi.Run()

}