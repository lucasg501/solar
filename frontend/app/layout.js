'use client';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import '../public/template/css/styles.css';
import '../public/template/css/sb-admin-2.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={nunito.className}>
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}

function LayoutContent({ children }) {
    return (
        <div id="wrapper">
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-pink sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-solid fa-solar-panel"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <sup>Painel Administrativo</sup>
                    </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <Link className="nav-link" href="/admin">
                        <i className="fas fa-home"></i>
                        <span>Início</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">Menu</div>

                <li className="nav-item">
                    <Link className="nav-link" href="/clientes">
                        <i className="fas fa-solid fa-users"></i>
                        <span>Clientes</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/contratos">
                        <i className="fas fa-solid fa-file"></i>
                        <span>Contratos</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/projetos">
                        <i className="fas fa-solid fa-clipboard"></i>
                        <span>Projetos</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/manutencoes">
                        <i className="fas fa-solid fa-gear "></i>
                        <span>Manutenções</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/vendas">
                        <i className="fas fa-solid fa-cash-register"></i>
                        <span>Vendas</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/kits">
                        <i className="fas fa-solid fa-box-open"></i>
                        <span>Kits</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/admin/usuarios">
                        <i className="fas fa-solid fa-users-gear"></i>
                        <span>Usuários(Administração)</span>
                    </Link>
                </li>
            </ul>

            {/* Topbar + Conteúdo */}
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        <span className="navbar-brand mb-0 h1">Sistema de Gerenciamento Solar</span>
                    </nav>
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}