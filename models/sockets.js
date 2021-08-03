const TicketList = require('./ticket-list');

class Sockets {
  constructor( io ) {
    this.io = io;
    
    this.socketEvents();

    // Crear la instancia para el TicketList
    this.ticketList = new TicketList();
  }

  socketEvents() {

    this.io.on('connection', ( socket ) => {
      console.log('Cliente conectado');

      socket.on('solicitar-ticket', ( data, callback ) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback( nuevoTicket );
      });

      socket.on('siguiente-ticket-trabajar', ( { agente, escritorio }, callback ) => {
        const ticketOtorgado = this.ticketList.asignarTicket( agente, escritorio );
        callback( ticketOtorgado );

        this.io.emit('ticket-asignado', this.ticketList.ultimos13);
      });
    });

  }
}

module.exports = Sockets;