import { charObj } from "../../data/validationData.js"; 
import { alphabetLtObj } from "../../data/validationData.js"; 

function isValidUsername(text) {

    if (text.length < 1) {
        return 'The name is too short.';
    }

    if (text.length > 20) {
        return 'The name is too long.';
    }

    const valid = true;
    let invalidSymbols = '';

    for (let i = 0; i < text.length; i++) {
        //a-z
        //ąčęėįšųūž
        const letterLt = alphabetLtObj[text[i]];
        const symbolAtCharCode = text.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            valid;
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            valid;
        } else if (letterLt) {
            valid;
        } else invalidSymbols += text[i];
    }

    if (invalidSymbols.length > 0) {
        return `This "${invalidSymbols}" symbol cannot be used`;
    }

    return text;
}


function isValidEmail(text) {
    const emailMinLength = 6;
    const emailMaxLength = 50;
    const domainMinLength = 2;
    const domainMaxLength = 6;
    const domainPartsMinLength = 2;
   
    if (text.length < emailMinLength) {
        return 'Email is too short.';
    }

    if (text.length > emailMaxLength) {
        return 'Email is too long.';
    }

    let countAtTheRate = 0;
    let parts = null;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '@') {
            countAtTheRate++;
        }
    }

    
    if (countAtTheRate > 1) {
        return 'The part after the @ should not contain the @ character.';
    }else if (countAtTheRate < 1) {
        return 'The @ symbol is missing.'
    }else {
        parts = text.split('@');
    }

    const recipientName = parts[0].length < domainPartsMinLength ? '' : parts[0];
    const domainNameParts = parts[1] < domainPartsMinLength ? '' : parts[1].split('.');
    const domain = domainNameParts.length < domainPartsMinLength ? '' : domainNameParts[domainNameParts.length -1];
    const domainName = parts[1].slice(0, -(domain.length +1)).length < 1 ? '' : parts[1].slice(0, -(domain.length +1));

    if (domainNameParts.length === 0) {
        return 'Incomplete email mail adress.'
    }

    if (recipientName.length === 0) {
        return 'Missing recipient name.'
    }

    if (domainName.length === 0) {
        return 'Missing domain name.'
    }

 
    const firstCharacter = recipientName[0];
    const lastCharacter = recipientName[recipientName.length -1];
    
    let recipientNameStr = '';
    let invalidCharacters = '';

    for (let i = 0; i < recipientName.length; i++) {
        //a-z
        //0-9
        //!# $ % & '* + - /.=?_
        const symbolAtCharCode = recipientName.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            recipientNameStr += recipientName[i];
        } else if (recipientName[i] >= '0' && recipientName[i] <= '9') {
            recipientNameStr += recipientName[i];
        } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            recipientNameStr += recipientName[i];
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else invalidCharacters += recipientName[i];

    }

    let domainNameStr = '';
    let invalidDomainCharacters = '';
    let isIpAddress = '';

    const firstCharacterDomainN = domainName[0];
    const lastCharacterDomainN = domainName[domainName.length -1];
    for (let i = 0; i < domainName.length; i++) {
        //a-z
        //0-9
        //-.
        const symbolAtCharCode = domainName.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            domainNameStr += domainName[i];
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            domainNameStr += domainName[i];
        } else if (domainName[i] >= '0' && domainName[i] <= '9') {
            domainNameStr += domainName[i];
            isIpAddress += domainName[i];
        } else if (symbolAtCharCode === charObj.minus || symbolAtCharCode === charObj.dot) {
            if (firstCharacterDomainN !== domainName[i] && domainName[i] !== lastCharacterDomainN && domainName[i] !== domainName[i + 1]) {
                domainNameStr += domainName[i];
                if (symbolAtCharCode === charObj.dot) {
                    isIpAddress += domainName[i];
                }
            } else invalidDomainCharacters += domainName[i];
        } else invalidDomainCharacters += domainName[i];        
    }


    if (recipientName.length !== recipientNameStr.length) {
        return `"${invalidCharacters[0]}" Used in the wrong "${recipientName}" place`;
    }

    if (domainName.length !== domainNameStr.length) {
        return `"${invalidDomainCharacters[0]}" Used in the wrong ${domainName} place`;
    }

    if (domain.length === 0) {
        return `The domain is missing.`;
    }

    if (domain.length < domainMinLength) {
        return `Domain too short: ${domain}.`;
    }

    if (domain.length > domainMaxLength) {
        return `Domain too long: ${domain}.`;
    }


    if (domainName.length === isIpAddress.length) {
        return `"${isIpAddress}" Invalid format.`;
    }

    return text;
}

function isValidPassword(text) {
    const passwordMinLength = 8;
    const passwordMaxLength = 50;
    const minimumLimit = 1;
    const valid = true;

    if (text.length < passwordMinLength) {
        return 'Passwords must be at least 8 characters.';
    }

    if (text.length > passwordMaxLength) {
        return 'Password is too long.';
    }

    let countLowerCaseLetters = 0;
    let countUpperCaseLetters = 0;
    let countNumbers = 0;

    let invalidPasswordStr = '';

    for (let i = 0; i < text.length; i++) {
        //a-z
        //0-9
        //!# $ % & '* + - /.=?_
        const symbolAtCharCode = text.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            valid;
            countLowerCaseLetters++
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            valid;
            countUpperCaseLetters++
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
            valid;
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
            valid;
        } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
            valid;
        } else if (text[i] >= '0' && text[i] <= '9') {
            valid;
            countNumbers++
        } else invalidPasswordStr += text[i];
    }
   
    if (invalidPasswordStr.length > 0) {
        return `This "${invalidPasswordStr}" symbol cannot be used`;
    }

    if (countLowerCaseLetters < minimumLimit) {
        return 'There must be at least one lowercase letter';
    }

    if (countUpperCaseLetters < minimumLimit) {
        return 'There must be at least one uppercase letter';
    }

    if (countNumbers < minimumLimit) {
        return 'There must be at least one number';
    }

    return text;
}



export {isValidUsername, isValidEmail, isValidPassword};