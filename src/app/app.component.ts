import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public clients: Client[] = [];
  public detailsClient?: Client
  public deleteClient?: Client

  constructor(private clientService: ClientService){}

  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-client-form')!.click();
    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  /*
  public onUpdateClient(client: Client): void {
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  */

  public onDeleteClient(clientId?: number): void {
    this.clientService.deleteClient(clientId!).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(client?: Client, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClientModal');
    }
    if (mode === 'details') {
      this.detailsClient = client;
      button.setAttribute('data-target', '#detailsClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
    }
    container?.appendChild(button);
    button.click();
  }


}