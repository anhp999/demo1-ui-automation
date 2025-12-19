import { Locator, Page } from "@playwright/test";
import { BasePage } from "@src/pages/base/BasePage";

export class QuickBookingWidget extends BasePage {

    private readonly selFilm = this.page.locator("//select[@name='film']")
    private readonly selCinema = this.page.locator("//select[@name='cinema']")
    private readonly selDate = this.page.locator("//select[@name='date']")
    private readonly btnBuyTicket = this.page.getByRole('button', { name: 'MUA VÉ NGAY' })
    private readonly txtAlert = this.page.locator("#swal2-title")
    private readonly btnClose = this.page.locator(".swal2-close")

    private readonly optCine = this.selCinema.locator('option:not([disabled])')
    private readonly optFilm = this.selFilm.locator('option:not([disabled])')
    private readonly optDate = this.selDate.locator('option:not([disabled])')
    constructor(page: Page) {
        super(page);
    }

    getCinemaOptions() {
        return this.optCine
    }

    getFilmOptions() {
        return this.optFilm
    }

    getDateOptions() {
        return this.optDate
    }

    getTxtAlert(): Locator {
        return this.txtAlert
    }

    getSelDate(): Locator {
        return this.selDate
    }

    async selectFilm(value: string) {
        await this.selFilm.selectOption(value)
    }

    async selectCinema(value: string) {
        await this.selCinema.selectOption(value)
    }

    async selectDate(value: string) {
        await this.selDate.selectOption(value)
    }

    async buyTickets() {
        await this.btnBuyTicket.click()
    }

    async bookingMovie(movie: string, cine: string, date: string) {
        await this.selectFilm(movie)
        await this.selectCinema(cine)
        await this.selectDate(date)
        await this.buyTickets()
    }
}