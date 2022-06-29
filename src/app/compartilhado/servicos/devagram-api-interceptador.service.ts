import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable } from "rxjs";
import { LoadingService } from "../componentes/loading/loading.service";

@Injectable({
    providedIn: 'root'
})
export class DevagramApiInterceptador implements HttpInterceptor {
    private requisicoesEmAndamento: number = 0;
    constructor(
        private loadingService: LoadingService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requisicoesEmAndamento++;
        if (this.requisicoesEmAndamento === 1) {
            this.loadingService.exibir();
        }

        const token = localStorage.getItem('token');
        let novaReq = req;
        if (token) {
            novaReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            })
        }

        return next.handle(novaReq).pipe(
            delay(2000), // 2 segundos
            finalize(() => {
                this.requisicoesEmAndamento--;
                if (this.requisicoesEmAndamento === 0) {
                    this.loadingService.ocultar();
                }
            })
        );
    }
}