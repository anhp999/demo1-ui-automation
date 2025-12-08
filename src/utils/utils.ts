
import { RegisterForm } from '@src/pages/RegisterPage';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
type UsernameRule = 'spec-char' | 'len' | 'badwords' | 'emoji' | 'digits' | 'valid'
type FullNameRule = 'spec-char' | 'len' | 'badwords' | 'emoji' | 'digits' | 'valid'

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const STRING = UPPER + LOWER
const SPECIAL = '!@#$%^&*()_+-={}[]|:;<>,.?/';
const EMOJIS = ['😀', '😁', '😂', '🤣', '😅', '😊', '😍', '🤩', '😎', '🤯', '😡', '😱'];

export async function gnwDataToFile(tcId: string) {
    const { username, pwd, confirmPwd, fullname, email } = generateUser()
    await writeExcel(tcId, {
        username,
        pwd,
        confirmPwd,
        fullname,
        email
    })

    return { username, pwd, confirmPwd, fullname, email }
}

export function generateUser(props?: RegisterForm) {
    const id = Math.floor(Math.random() * 100000);
    const pwd = generateStrongPassword()

    return {
        username: props?.username || `TU_${id}`,
        pwd: props?.pwd || pwd,
        confirmPwd: props?.pwd || pwd,
        fullname: props?.fullname || `TestUser`,
        email: props?.email || `testuser_${id}@test.com`,
    };
}

export function generateUsername(rule: UsernameRule, len: number) {
    const prefix = 'TU_';
    switch (rule) {
        case 'spec-char':
            return prefix + random(SPECIAL, 5);
        case 'len':
            if (len <= 3) {
                return random(STRING, len)
            }
            const rest = len - prefix.length
            return prefix + random(STRING, rest);
        case 'badwords':
            const badwords = 'fuck'
            const word = prefix + badwords
            return word + random(NUMBERS, 3);
        case 'digits':
            return random(NUMBERS, 8)
        case 'emoji':
            return prefix + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        default:
            return prefix + random(STRING, 8);
    }
}

export function generateFullName(rule: FullNameRule, len: number) {
    const prefix = 'TU';
    switch (rule) {
        case 'spec-char':
            return prefix + random(SPECIAL, 5);
        case 'len':
            if (len <= 1) {
                return 'T'
            }
            const rest = len - prefix.length
            return prefix + random(STRING, rest);
        case 'badwords':
            const badwords = 'fuck'
            const word = prefix + badwords
            return word + random(STRING, 3);
        case 'digits':
            return random(NUMBERS, 8)
        case 'emoji':
            return prefix + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        default:
            return 'TestUser';
    }
}

export function generateEmailBy(length: number): string {
    const domain = "@test.com";
    const domainLength = domain.length;

    if (length <= domainLength) {
        return domain
    }

    const usernameLength = length - domainLength;
    const chars = STRING + NUMBERS;
    let username = "";

    for (let i = 0; i < usernameLength; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return username + domain;
}


export async function writeExcel(tcId: string, data: RegisterForm) {
    const folderPath = path.join('test-data');
    const filePath = path.join(folderPath, 'data.xlsx');

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
    }

    const sheetName = new Date().toISOString().split('T')[0];

    let sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
        sheet = workbook.addWorksheet(sheetName);
        sheet.addRow(['TC-ID', 'Username', 'Email', 'Password', 'ConfirmPassword', 'FullName']);
    }

    sheet.addRow([
        tcId,
        data.username,
        data.email,
        data.pwd,
        data.confirmPwd,
        data.fullname,
    ]);

    await workbook.xlsx.writeFile(filePath);
}


export function generateStrongPassword(length = 10) {
    const mustHave = [
        LOWER[Math.floor(Math.random() * LOWER.length)],
        UPPER[Math.floor(Math.random() * UPPER.length)],
        NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
        SPECIAL[Math.floor(Math.random() * SPECIAL.length)],
    ];

    const allChars = LOWER + UPPER + NUMBERS + SPECIAL;

    while (mustHave.length < length) {
        mustHave.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    return mustHave.sort(() => Math.random() - 0.5).join('');
}

const random = (chars: string, length: number) =>
    Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

