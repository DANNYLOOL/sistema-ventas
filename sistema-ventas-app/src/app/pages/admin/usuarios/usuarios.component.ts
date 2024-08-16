import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UsuariosService } from '../../auth/services/usuarios.service';
import { Rol } from '../../../shared/models/rol.interface';
import Swal from 'sweetalert2';
import { Action } from './components/usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  roles: Rol[] = [];
  Action = Action;

  constructor(private dialog: MatDialog, private usuariosSrv: UsuariosService) { }

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: String[] = ['nombre', 'apellido', 'username', 'rol', 'acciones'];

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosSrv.getUsuarios().subscribe({
      next: (usuarios) => {
        usuarios.sort((a, b) => (a.cveusuario || 0) - (b.cveusuario || 0));
        this.dataSource.data = usuarios;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }

  getRolesDisplay(roles: Rol[]): string {
    return roles.map(r => r.nombre).join(', ');
  }

  onDeleteUsuario(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosSrv.deleteUsuario(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado.',
              'success'
            );
            this.getUsuarios();
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el usuario.',
              'error'
            );
            console.error('Error al eliminar usuario', err);
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}, action: Action) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      maxWidth: '100%',
      width: '80%',
      data: {
        user,
        action
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsuarios();
      }
    });
  }

  ngOnDestroy(): void {

  }
}
