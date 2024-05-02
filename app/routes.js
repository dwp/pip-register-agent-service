//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const util = require('util')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// Add your routes here

// alt-formats routes
require('./views/alternative-formats/_routes')(router);

// Eligilibility v2

// welcome to PIP
router.post('/v2-ucd-register/signposting-eligibility/service-start-page', function(request, response) {
    var claimingSelf = request.session.data['claiming-self']
    if (claimingSelf == 'yes'){
        response.redirect('/v2-ucd-register/signposting-eligibility/over-16')
    } else if (claimingSelf == "no") {
        response.redirect('/v2-ucd-register/signposting-eligibility/someone-else-bau-kickout')
    }
})

// Are you over 16 and under SPA?
router.post('/v2-ucd-register/signposting-eligibility/over-16', function(request, response) {
    var correctAge = request.session.data['age']
    if (correctAge == 'yes'){
        response.redirect('/v2-ucd-register/signposting-eligibility/security-check')
    } else if (correctAge == "no-under-16") {
        response.redirect('/v2-ucd-register/signposting-eligibility/under-16-ineligible')
    } else if (correctAge == "no-over-spa") {
        response.redirect('/v2-ucd-register/signposting-eligibility/stop-getting-pip-last-year')
    }
})


// Passed security?
router.post('/v2-ucd-register/signposting-eligibility/security-check', function(request, response) {
    var verified = request.session.data['security-verified']
    if (verified == 'yes'){
        response.redirect('/v2-ucd-register/signposting-eligibility/srel')
    } else if (verified == "no") {
        response.redirect('/v2-ucd-register/signposting-eligibility/failed-security')
    }
})

// Claiming under SREL?
router.post('/v2-ucd-register/signposting-eligibility/srel', function(request, response) {
    var srel = request.session.data['srel']
    if (srel == 'yes'){
        response.redirect('/v2-ucd-register/signposting-eligibility/srel-bau-kickout')
    } else if (srel == "no") {
        response.redirect('/v2-ucd-register/welcome-screens/welcome-screen-ni')
    } 
})

//---------------------------------------------------------------------------------------------
// Eligilibility v1

// 16 or over
router.post('/research/sprint-4/16-or-over', function(request, response) {
    var areYou16 = request.session.data['are-you-16-or-over']
    if (areYou16 == 'yes'){
        response.redirect('/research/sprint-4/are-you-under-state-pension-age')
    } else if (areYou16 == "no") {
        response.redirect('/research/sprint-4/ineligible') // This will be the are you getting disability living allowance for children page
    }
})

// next screen - under state pension age page
router.post('/research/sprint-4/are-you-under-state-pension-age', function(request, response) {
    var areYouUnderStatePensionAge = request.session.data['are-you-under-state-pension-age']
    if (areYouUnderStatePensionAge == 'yes'){
        response.redirect('/research/sprint-4/where-do-you-live')
    } else if (areYouUnderStatePensionAge == 'no') {
        response.redirect('/research/sprint-4/ineligible')
    }
})

// Where do you live page
router.post('/research/sprint-4/where-do-you-live', function(request, response) {
    var whereDoYouLive = request.session.data['where-do-you-live']
    switch (whereDoYouLive) {
        case 'england':
        case 'northern-ireland':
        case 'wales':
            response.redirect('/research/sprint-4/are-you-getting-any-of-these-benefits')
            break
        case 'scotland':
        case 'none':
            response.redirect('/research/sprint-4/ineligible')
    }
})

// Are you getting any of these benefits page
router.post('/research/sprint-4/are-you-getting-any-of-these-benefits', function(request, response) {
    var areYouGettingAnyOfTheseBenefits = request.session.data['are-you-getting-any-of-these-benefits']
    switch (areYouGettingAnyOfTheseBenefits) {
        case 'armed-forces':
        case 'dla':
        case 'pip':
            response.redirect('/research/sprint-4/ineligible')
            break
        case 'none':
            response.redirect('/research/sprint-4/do-you-have-a-long-term-condition')
    }
})

// Do you have a long term condition or disability page
router.post('/research/sprint-4/do-you-have-a-long-term-condition', function(request, response) {
    var doYouHaveALongTermCondition = request.session.data['do-you-have-a-long-term-condition']
    if (doYouHaveALongTermCondition == 'yes'){
        response.redirect('/research/sprint-4/do-you-find-it-hard-to-do-everyday-tasks')
    } else if (doYouHaveALongTermCondition == 'no') {
        response.redirect('/research/sprint-4/ineligible')
    }
})

// Do you find it hard to do everyday tasks page
router.post('/research/sprint-4/do-you-find-it-hard-to-do-everyday-tasks', function(request, response) {
    var everydayTaskDifficulty = request.session.data['do-you-find-it-hard-to-do-everyday-tasks']
    switch (everydayTaskDifficulty) {
        case 'yes':
        case 'i do not know':
            response.redirect('/research/sprint-4/when-did-it-start-being-hard-to-do-everyday-tasks')
            break;
        case 'no': 
            response.redirect('/research/sprint-4/ineligible')
    }
})

// When did it start being hard for you to do everyday tasks page
router.post('/research/sprint-4/when-did-it-start-being-hard-to-do-everyday-tasks', function(request, response) {
    var when = request.session.data['when-did-it-start-being-hard-to-do-everyday-tasks']
    switch (when) {
        case 'last-12-months':
            response.redirect('/research/sprint-4/ineligible')
            break;
        case 'over-12-months': 
            response.redirect('/research/sprint-4/you-may-be-eligible')
    }
})


//DEV--->

// REGISTER/CONTACT-DETAILS
// What is your name page
router.post('/register/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/register/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/register/contact-details/what-is-your-phone-number', function(request, response) {
    response.redirect('/register/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/register/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/register/contact-details/what-is-your-postcode')
})

// What is your phone number page
router.post('/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/what-is-your-postcode')
})

// What is your postcode page
router.post('/register/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/register/contact-details/select-your-address')
})

// Select your address page
router.post('/register/contact-details/select-your-address', function(request, response) {
    response.redirect('/register/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/register/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/register/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/register/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/register/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/register/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/register/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/register/contact-details/confirm-correspondence-address')
})


// correspondence enter address manually page
router.post('/register/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/register/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/register/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/register/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/register/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/register/contact-details/alternative-formats')
})

// Alternative formats page
router.post('/register/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/register/contact-details/contact-details-summary')
    }
})

// Contact details summary page
router.post('/register/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/register/task-list-cd-done')
})



// REGISTER/NATIONALITY
// What is your nationality page
router.post('/register/nationality/what-is-your-nationality', function(request, response) {
    response.redirect('/register/nationality/what-country-do-you-live-in')
})

// What is country do you normally live in page
router.post('/register/nationality/what-country-do-you-live-in', function(request, response) {
    response.redirect('/register/nationality/lived-elsewhere')
})

// Have you lived anywhere other than UK in last 3 years page
router.post('/register/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/register/nationality/abroad-over-four-weeks')
    }
})

// Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/register/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/register/nationality/benefits-abroad')
    }
})

// Benefits abroad
router.post('/register/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/register/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/register/nationality/insurance-abroad')
    }
})

// Are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/register/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/register/nationality/nationality-summary')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/register/nationality/nationality-summary')
    }
})

//-----------------------------------------------------------------------------------------------------

// REGISTER/HEALTHCARE-PROFESSIONAL

//Your main health contact
router.post('/register/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/register/healthcare-professional/additional-support-needed')
})

//anyone else who knows about your condition?
router.post('/register/healthcare-professional/additional-support-needed', function(request, response) {
    var supportNeeded = request.session.data['support-needed']
    if (supportNeeded == 'yes'){
        response.redirect('/register/healthcare-professional/additional-support-type')
    } else if (supportNeeded == 'no') {
        response.redirect('/register/task-list-hcp-done')
    }
})

//Your second health contact
router.post('/register/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/register/task-list-hcp-done')
})

//-----------------------------------------------------------------------------------------------------

//REGISTER/HOSPITAL-DATES

// Are you in hospital or hospice as an in-patient today?
router.post('/register/hospital-dates/5-2-today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/register/hospital-dates/5-4-yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/register/hospital-dates/5-3-other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/register/hospital-dates/5-8-hospice-yesterday')
    }
})

// Were you in hospital yesterday?
router.post('/register/hospital-dates/5-4-yesterday', function(request, response) {
    response.redirect('/register/hospital-dates/5-5-private-patient')
})


// are you a private patient? > What is the name and address of the hospital?
router.post('/register/hospital-dates/5-5-private-patient', function(request, response) {
    response.redirect('/register/hospital-dates/5-6-postcode')
})

// postcode > select address
router.post('/register/hospital-dates/5-6-postcode', function(request, response) {
    response.redirect('/register/hospital-dates/5-7-select-hospital-address')
})

// Were you in hospice yesterday?
router.post('/register/hospital-dates/5-8-hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/register/hospital-dates/5-9-hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/register/hospital-dates/5-10-hospice-postcode')
    }
})

// Do you know the date you went into the hospice?
router.post('/register/hospital-dates/5-9-hospice-dates', function(request, response) {
    response.redirect('/register/hospital-dates/5-10-hospice-postcode')
})

// select hospice address
router.post('/register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/register/hospital-dates/5-11-select-hospice-address')
})

// select hospice address
router.post('/register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/register/hospital-dates/5-11-select-hospice-address')
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/register/hospital-dates/5-3-other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/register/hospital-dates/5-12-other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('#')
    }
})

// Were you living in this place yesterday?
router.post('/register/hospital-dates/5-12-other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/register/hospital-dates/5-13-third-party-pay')
    } else if (otherYesterday == 'no') {
        response.redirect('/register/hospital-dates/5-13-third-party-pay')
    }
})

// Does a local authority, health authority, Jobcentre Plus, or a charity pay any of the costs for you to live there?
router.post('/register/hospital-dates/5-13-third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'local'){
        response.redirect('/register/hospital-dates/5-14-local-agreement')
    } else if (thirdPartyPay == 'no') {
        response.redirect('/register/hospital-dates/5-15-other-postcode')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/register/hospital-dates/5-15-other-postcode')
    }
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/register/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/register/hospital-dates/5-15-other-postcode')
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/register/hospital-dates/5-15-other-postcode', function(request, response) {
    response.redirect('/register/hospital-dates/5-16-select-other-address')
})

// Select other address > tasklist
router.post('/register/hospital-dates/5-16-select-other-address', function(request, response) {
    response.redirect('/register/hospital-dates/other-residence-summary')
})

// CYA > task list
router.post('/register/hospital-dates/other-residence-summary', function(request, response) {
    response.redirect('/register/task-list-in-progress-hospice')
})

// -------------------------------------------------------------------------------------

// DEV READY

// Eligibility launched from main UI
router.post('/ucd-register/signposting-eligibility/service-start-page', function(request, response) {
var newClaim = request.session.data['claiming-self']
if (newClaim == 'yes'){
    response.redirect('/ucd-register/signposting-eligibility/over-16')
} else if (newClaim == "no") {
    response.redirect('/ucd-register/signposting-eligibility/someone-else-bau-kickout')
}
})


// Are you over 16 and under SPA?
router.post('/ucd-register/signposting-eligibility/over-16', function(request, response) {
    var correctAge = request.session.data['age']
    if (correctAge == 'yes'){
        response.redirect('/ucd-register/signposting-eligibility/security-check')
    } else if (correctAge == "no-under-16") {
        response.redirect('/ucd-register/signposting-eligibility/under-16-ineligible')
    } else if (correctAge == "no-over-spa") {
        response.redirect('/ucd-register/signposting-eligibility/stop-getting-pip-last-year')
    }
})

// What security questions were answered?
router.post('/ucd-register/signposting-eligibility/security-check', function(request, response) {
    var srel = request.session.data['security-verified']
    if (srel == 'yes'){
        response.redirect('/ucd-register/signposting-eligibility/srel')
    } else if (srel == "no") {
        response.redirect('/ucd-register/signposting-eligibility/failed-security')
    } 
    })

// Claiming under SREL?
router.post('/ucd-register/signposting-eligibility/srel', function(request, response) {
    var srel = request.session.data['srel']
    if (srel == 'yes'){
        response.redirect('/ucd-register/signposting-eligibility/srel-bau-kickout')
    } else if (srel == "no") {
        response.redirect('/ucd-register/welcome-screens/welcome-screen-ni')
    } 
    })

//---------------------------------------------------------------------------------------------


// DEVS
// Declaration
router.post('/ucd-register/declaration', function(request, response) {
    var agree = request.session.data['agree']
    if (agree == 'yes'){
        response.redirect('/ucd-register/task-list')
    } else if (agree == 'no') {
        response.redirect('/ucd-register/declaration-kickout')
    }
})

// -------------------------------------------------------------------------------------
// DEVS
//UCD-REGISTER/Contact-details

// What is your name
router.post('/ucd-register/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-dob')
})

// What is your DOB
router.post('/ucd-register/contact-details/what-is-your-dob', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/ucd-register/contact-details/what-is-your-phone-number', function(request, response) {
        response.redirect("/ucd-register/contact-details/do-you-want-to-receive-text-updates")
}) 

// What is your Textphone number?
router.post('/ucd-register/contact-details/alt-formats/what-is-your-textphone-number', function(request, response) {
    response.redirect('/ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// What signing or lipspeaking service do you need?
router.post('/ucd-register/contact-details/alt-formats/signing-lipspeaking', function(request, response) {
    response.redirect('/ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/ucd-register/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/ucd-register/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/ucd-register/contact-details/select-your-address')
})

// Select your address page
router.post('/ucd-register/contact-details/select-your-address', function(request, response) {
    response.redirect('/ucd-register/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/ucd-register/contact-details/enter-address-manually-country', function(request, response) {
    response.redirect('/ucd-register/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/ucd-register/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/ucd-register/contact-details/alt-formats/written-format')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/ucd-register/contact-details/correspondence-postcode')
    }
})

// Would you like us to send your letters in another way, like larger text, audio or braille?
router.post('/ucd-register/contact-details/alt-formats/written-format', function(request, response) {
    var writtenFormat = request.session.data['written-format']
    if (writtenFormat == 'standard-letter'){
        response.redirect('/ucd-register/contact-details/contact-details-summary')
    } else if (writtenFormat == 'large-print') {
        response.redirect('/ucd-register/contact-details/alt-formats/large-print')
     } else if (writtenFormat == 'audio') {
        response.redirect('/ucd-register/contact-details/contact-details-summary')
    } else if (writtenFormat == 'braille') {
        response.redirect('/ucd-register/contact-details/contact-details-summary')
    } else if (writtenFormat == 'email') {
        response.redirect('/ucd-register/contact-details/alt-formats/email-reason')
    } else if (writtenFormat == 'pdf') {
        response.redirect('/ucd-register/contact-details/alt-formats/email-reason')
    } 
    
})

// What size print do you need?
router.post('/ucd-register/contact-details/alt-formats/large-print', function(request, response) {
    response.redirect('/ucd-register/contact-details/contact-details-summary')
})

// Why do you need us to contact you by email instead of printed letters?
router.post('/ucd-register/contact-details/alt-formats/email-reason', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/what-is-your-email')
})

// What is your email address?
router.post('/ucd-register/contact-details/alt-formats/what-is-your-email', function(request, response) {
    response.redirect('/ucd-register/contact-details/contact-details-summary')
})

// What is your correspondence postcode page
router.post('/ucd-register/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/ucd-register/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/ucd-register/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/written-format')
})

// Confirm correspondence address page
router.post('/ucd-register/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/written-format')
})

// Contact details summary page
router.post('/ucd-register/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/ucd-register/task-list-cd-done')
})

// -------------------------------------------------------------------------------------

//UCD-REGISTER/ADDITIONAL-SUPPORT

// -------------------------------------------------------------------------------------

//UCD-REGISTER/NATIONALITY

//MTP APRIL RELEASE - NATIONALITY
//ucd-register/nationality

//start
router.post('/ucd-register/nationality/start', function(request, response) {
    response.redirect('/ucd-register/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/ucd-register/nationality/what-is-your-nationality', function(request, response) {
    var nationality = request.session.data['nationality']
    if (nationality == 'british'){
        response.redirect('/ucd-register/nationality/uk-2-of-3-years')
    } else if (nationality == 'irish') {
        response.redirect('/ucd-register/nationality/uk-2-of-3-years')
    } else if (nationality == 'other') {
        response.redirect('/ucd-register/nationality/another-nationality')
    }
})

//Have you been in the UK for at least 2 of the last 3 years?
router.post('/ucd-register/nationality/uk-2-of-3-years', function(request, response) {
    var ukYears = request.session.data['uk-years']
    if (ukYears == 'yes'){
        response.redirect('/ucd-register/nationality/insurance-abroad')
    } else if (ukYears == 'no') {
        response.redirect('/ucd-register/nationality/insurance-abroad')
    } else if (ukYears == 'unsure') {
        response.redirect('/ucd-register/nationality/insurance-abroad')
    } 
})

//Select other nationality
router.post('/ucd-register/nationality/another-nationality', function(request, response) {
    var anotherNationality = request.session.data['another-nationality']
    if (anotherNationality == 'Norway' || anotherNationality == 'Iceland'){
        response.redirect('/ucd-register/nationality/unhappy-path/nationality-types/living-in-uk-before')
    }
    if (anotherNationality == 'Australia' || anotherNationality == 'Brazil' || anotherNationality == 'Bangladesh' ){
        response.redirect('/ucd-register/nationality/uk-2-of-3-years')
    }
})

//Were you living in the UK on or before 31/12/20?
router.post('/ucd-register/nationality/unhappy-path/nationality-types/living-in-uk-before', function(request, response) {
    response.redirect('/ucd-register/nationality/uk-2-of-3-years')
})

//Are you working or paying national insurance in another country?

router.post('/ucd-register/nationality/insurance-abroad', function(request, response) {
    var payingInsurance= request.session.data['insurance-abroad']
    if (payingInsurance == 'no'){
      response.redirect('/ucd-register/nationality/benefits-abroad')
    } else if (payingInsurance == 'yes') {
        response.redirect('/ucd-register/nationality/benefits-abroad')
    }
  })
  
  // Are you receiving pensions or benefits in another country?
  router.post('/ucd-register/nationality/benefits-abroad', function(request, response) {
      var payingBenefits= request.session.data['benefits-abroad']
      if (payingBenefits == 'no'){
        response.redirect('/ucd-register/nationality/nationality-summary')
      } else if (payingBenefits == 'yes') {
          response.redirect('/ucd-register/nationality/nationality-summary')
      }
  })
  
        //What country are you receiving pensions or benefits in?
        router.post('/ucd-register/nationality/exportability/what-country-benefits', function(request, response) {
            response.redirect('/ucd-register/task-list-nat-done')
        })
  
    //Are any of your family members receiving pensions or benefits in another country?
    router.post('/ucd-register/nationality/exportability/family-receiving-benefits', function(request, response) {
        var payingBenefits= request.session.data['family-receiving-benefits']
        if (payingBenefits == 'no'){
        response.redirect('/ucd-register/task-list-nat-done')
        } else if (payingBenefits == 'yes') {
            response.redirect('/ucd-register/nationality/exportability/family-country-benefits')
        }
    })

    //What country are your family members receiving pensions or benefits in?
    router.post('/ucd-register/nationality/exportability/family-country-benefits', function(request, response) {
    response.redirect('/ucd-register/task-list-nat-done')
    })


//--------------------------------------------------------------------------------------------------------------
//nationality start
router.post('/ucd-register/nationality/start', function(request, response) {
    response.redirect('/ucd-register/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/ucd-register/nationality/what-is-your-nationality', function(request, response) {
    var nationality = request.session.data['nationality']
    if (nationality == 'british'){
        response.redirect('/ucd-register/nationality/what-country-do-you-live-in')
    } else if (nationality == 'irish') {
        response.redirect('/ucd-register/nationality/what-country-do-you-live-in')
    } else if (nationality == 'other') {
        response.redirect('/ucd-register/nationality/another-nationality')
    }
})

// Another nationality
router.post('/versions/devs/nationality/another-nationality', function(request, response) {
    response.redirect('/versions/devs/nationality/what-country-do-you-live-in')
})

//what country do you normally live in page
router.post('/versions/devs/nationality/what-country-do-you-live-in', function(request, response) {
    var nationality = request.session.data['country']
    if (nationality == 'northern-ireland'){
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'england') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'wales') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'scotland') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'another-country') {
        response.redirect('/versions/devs/nationality/another-country-lived-in')
    }
})

// Another country
router.post('/versions/devs/another-country-lived-in', function(request, response) {
    response.redirect('/versions/devs/nationality/lived-elsewhere')
})


//Have you lived anywhere other than UK in last 3 years page
router.post('/versions/devs/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/versions/devs/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/versions/devs/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/versions/devs/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/versions/devs/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/versions/devs/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/versions/devs/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/versions/devs/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/versions/devs/nationality/nationality-summary')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/versions/devs/nationality/nationality-summary')
    }
})

//summary to task list
router.post('/versions/devs/nationality/nationality-summary', function(request, response) {
    response.redirect('/versions/devs/task-list-nat-done')
})

// -------------------------------------------------------------------------------------

//UCD-REGISTER/HEALTHCARE-PROFESSIONAL

   //start ---> healthcare-prof-type
   router.post('/ucd-register/healthcare-professional/start', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/healthcare-prof-type')
})


//healthcare-prof-type ---> what is their postcode
router.post('/ucd-register/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/postcode')
})

//healthcare-prof-type ---> find address
router.post('/ucd-register/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/postcode')
})

//find address ---> select address
router.post('/ucd-register/healthcare-professional/postcode', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/select-your-address')
})

//select address ---> addiitonal support needed
router.post('/ucd-register/healthcare-professional/select-your-address', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/additional-support-needed')
})

//enter-address-manually ----> second support needed?
router.post('/ucd-register/healthcare-professional/enter-address-manually', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/additional-support-needed')
})


//additional-support-needed ---> additional-support-type
router.post('/ucd-register/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/ucd-register/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/ucd-register/healthcare-professional/consent-NI')
    }
})

//additional-support-type ---> find address
router.post('/ucd-register/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/postcode-support')
})

//find address ---> select address
router.post('/ucd-register/healthcare-professional/postcode-support', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/select-support-address')
})

//enter-address-manually ----> hospital and accom start
router.post('/ucd-register/healthcare-professional/support-address-manually', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/consent-NI')
})


//select support address ---> hospital and accom start
router.post('/ucd-register/healthcare-professional/select-support-address', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/consent-NI')
})

//consent NI ----> hcp cya 2 person 
router.post('/ucd-register/healthcare-professional/consent-NI', function(request, response) {
    response.redirect('/ucd-register/healthcare-professional/hcp-cyas/hp-summary-two')
})

//---------------------------------------------------------------------------------
//ucd-register/HEALTHCARE-PROFESSIONAL/CYAS

//remove 2nd hcp
router.post('/ucd-register/healthcare-professional/hcp-cyas/remove-health-professional-2', function(request, response) {
    var removeHcp = request.session.data['remove-second-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/ucd-register/healthcare-professional/healthcare-prof-type')
    } else if (removeHcp == 'no'){
    response.redirect('/ucd-register/healthcare-professional/hcp-cyas/remove-second-hcp')
}
})

//remove main hcp
router.post('/ucd-register/healthcare-professional/hcp-cyas/remove-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/ucd-register/healthcare-professional/hcp-cyas/remove-main-hcp')
    } else if (removeHcp == 'no'){
    response.redirect('/ucd-register/healthcare-professional/hcp-cyas/hp-summary-two')
}
})

//remove final hcp
router.post('/ucd-register/healthcare-professional/hcp-cyas/remove-add-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-final-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/ucd-register/healthcare-professional/hcp-cyas/add-new/healthcare-prof-type')
    } else if (removeHcp == 'no'){
    response.redirect('/ucd-register/healthcare-professional/hcp-cyas/remove-main-hcp')
}
})


//add new hcp from remocving all contacts---> do you want to add another contact?
router.post('/ucd-register/healthcare-professional/hcp-cyas/add-new/additional-support-needed', function(request, response) {
    var removeHcp = request.session.data['support-needed']
    if (removeHcp == 'yes'){
        response.redirect('/ucd-register/healthcare-professional/hcp-cyas/add-new/additional-support-type')
    } else if (removeHcp == 'no'){
    response.redirect('/ucd-register/healthcare-professional/hcp-cyas/remove-second-hcp')
}
})

//----------------------------------------------------------------------------------
//UCD-REGISTER/ADDITIONAL-SUPPORT

router.post('/ucd-register/additional-support/start-info', function(request, response) {
    response.redirect('/ucd-register/additional-support/do-you-have-a-condition')
})

// do you have a condition 
router.post('/ucd-register/additional-support/do-you-have-a-condition', function(request, response) {
    var anyCondition = request.session.data['any-condition']
    if (anyCondition == 'yes'){
        response.redirect('/ucd-register/additional-support/complete-forms')
    } else if (anyCondition == 'no') {
        response.redirect('/ucd-register/additional-support/advice-non-as-marker')
    }
})

// can you complete forms
router.post('/ucd-register/additional-support/complete-forms', function(request, response) {
    var forms = request.session.data['forms']
    var letters = request.session.data['letters']
    var post = request.session.data['post'] 
    if (forms == 'yes' && letters == 'yes' && post == 'yes') {
        response.redirect('/ucd-register/additional-support/advice-non-as-marker')
      } else if (forms == 'no' || letters == 'no' || post == 'no') {
        response.redirect('/ucd-register/additional-support/helpers')
      }
})

router.post('/ucd-register/additional-support/advice-non-as-marker', function(request, response) {
    response.redirect('/ucd-register/additional-support/add-support-summary')
})

router.post('/ucd-register/additional-support/read-letters', function(request, response) {
    response.redirect('/ucd-register/additional-support/post')
})

router.post('/ucd-register/additional-support/post', function(request, response) {
    response.redirect('/ucd-register/additional-support/helpers')
})

// Do you have anyone to help you?
router.post('/ucd-register/additional-support/helpers', function(request, response) {
    var anyoneHelp = request.session.data['helpers']
    if (anyoneHelp == 'yes'){
        response.redirect('/ucd-register/additional-support/who-helps')
    } else if (anyoneHelp == 'no') {
        response.redirect('/ucd-register/additional-support/advice-as-marker')
    }
})

router.post('/ucd-register/additional-support/who-helps', function(request, response) {
    response.redirect('/ucd-register/additional-support/advice-as-marker')
})

router.post('/ucd-register/additional-support/advice', function(request, response) {
    response.redirect('/ucd-register/additional-support/add-support-summary')
})
// -------------------------------------------------------------------------------------

//UCD-REGISTER/HOSPITAL-DATES

//hospital and accom start ----> Are you in hospital or hospice as an in-patient today?
router.post('/ucd-register/hospital-dates/5-1-why-we-need-details', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-2-today')
})
// Are you in hospital or hospice as an in-patient today?
router.post('/ucd-register/hospital-dates/5-2-today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/ucd-register/hospital-dates/5-4-yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/ucd-register/hospital-dates/5-3-other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/ucd-register/hospital-dates/5-8-hospice-yesterday')
    }
})

// Were you in hospital yesterday?
router.post('/ucd-register/hospital-dates/5-4-yesterday', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-5-private-patient')
})


// are you a private patient? > What is the name and address of the hospital?
router.post('/ucd-register/hospital-dates/5-5-private-patient', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-6-postcode')
})

// postcode > select address
router.post('/ucd-register/hospital-dates/5-6-postcode', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-7-select-hospital-address')
})

// postcode > select address
router.post('/ucd-register/hospital-dates/5-7-select-hospital-address', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/hospital-residence-summary')
})

// hospital manually > start bank
router.post('/ucd-register/hospital-dates/5-17-hospital-address-manually', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/hospital-residence-summary')
})

// hospice manually > start bank
router.post('/ucd-register/hospital-dates/5-18-hospice-address-manually', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/hospice-residence-summary')
})

// other manually > start bank
router.post('/ucd-register/hospital-dates/5-19-other-address-manually', function(request, response) {
    response.redirect('/ucd-register/task-list-accom-done')
})

// Were you in hospice yesterday?
router.post('/ucd-register/hospital-dates/5-8-hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/ucd-register/hospital-dates/5-9-hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/ucd-register/hospital-dates/5-10-hospice-postcode')
    }
})

// Do you know the date you went into the hospice?
router.post('/ucd-register/hospital-dates/5-9-hospice-dates', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-10-hospice-postcode')
})

// select hospice address
router.post('/ucd-register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-11-select-hospice-address')
})

// select hospice address
router.post('/ucd-register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-11-select-hospice-address')
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/ucd-register/hospital-dates/5-11-select-hospice-address', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/hospice-residence-summary')
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/ucd-register/hospital-dates/5-3-other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/ucd-register/hospital-dates/5-12-other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('/ucd-register/task-list-accom-done')
    }
})

// Were you living in this place yesterday?
router.post('/ucd-register/hospital-dates/5-12-other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/ucd-register/hospital-dates/5-15-other-postcode')
    } else if (otherYesterday == 'no') {
        response.redirect('/ucd-register/hospital-dates/5-15-other-postcode')
    }
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/ucd-register/hospital-dates/5-15-other-postcode', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-16-select-other-address')
})

// Select other address > tasklist
router.post('/ucd-register/hospital-dates/5-16-select-other-address', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-13-third-party-pay')
})

// Does a local authority, health authority, Jobcentre Plus, or a charity pay any of the costs for you to live there?
router.post('/ucd-register/hospital-dates/5-13-third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'health-trust'){
        response.redirect('/ucd-register/hospital-dates/5-23-name-local')
    } else if (thirdPartyPay == 'no') {
        response.redirect('/ucd-register/hospital-dates/other-residence-summary')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/ucd-register/hospital-dates/5-23-name')
    }
})

// What is the name of the [organisation type]?
router.post('/ucd-register/hospital-dates/5-23-name', function(request, response) {
    response.redirect('/ucd-register/task-list-accom-done')
})

// local auth ---> What is the name -----> agreement?
router.post('/ucd-register/hospital-dates/5-23-name-local', function(request, response) {
    response.redirect('/ucd-register/hospital-dates/5-14-local-agreement')
})

// agreement to task list
router.post('/ucd-register/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/ucd-register/task-list-accom-done')
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/ucd-register/hospital-dates/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/ucd-register/task-list-accom-done')
})


// other residence summary >  tasklist
router.post('/ucd-register/hospital-dates/hospital-dates/other-residence-summary', function(request, response) {
    response.redirect('/ucd-register/task-list-accom-done')
})

// -------------------------------------------------------------------------------------

//UCD-REGISTER/BANK-DETAILS/MAIN-ACCOUNT-DETAILS

// Can you give me your account details now?
router.post('/ucd-register/bank-details/6-1-start', function(request, response) {
    var detailsNow = request.session.data['details-now']
    if (detailsNow == 'yes'){
        response.redirect('/ucd-register/bank-details/6-3-main-account-details-v2')
    } else if (detailsNow == 'no') {
        response.redirect('/ucd-register/bank-details/6-2-no-details-now')
    }
})

// You can continue without entering account details
router.post('/ucd-register/bank-details/6-2-no-details-now', function(request, response) {
    response.redirect('/ucd-register/task-list-bank-done')
})

// Main account details
router.post('/ucd-register/bank-details/6-3-main-account-details-v2', function(request, response) {
    response.redirect('/ucd-register/bank-details/bank-details-summary')
})

// Bank details CYA to task list
router.post('/ucd-register/bank-details/bank-details-summary', function(request, response) {
    response.redirect('/ucd-register/task-list-bank-done')
})

//Motability to Motability CYA
router.post('/ucd-register/motability/motability', function(request, response) {
    response.redirect('/ucd-register/task-list-motability-done')
})

//Motability to Motability CYA
router.post('/ucd-register/task-list-motability-done', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/what-happens-next')
})

// -------------------------------------------------------------------------------------

// Save application- i will now submit
router.post('/ucd-register/what-happens-next/save-application', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/what-happens-next')
})
//design-updates/sprint-20/what-happens-next/what-happens-next
router.post('/ucd-register/what-happens-next/what-happens-next', function(request, response) {
    var previousOnline = request.session.data['previous-online-claim']
    if (previousOnline  == 'yes'){
        response.redirect('/ucd-register/what-happens-next/paper-whn-1')
    } else if (previousOnline  == 'no') {
        response.redirect('/ucd-register/what-happens-next/online-form-option')
    }
})

router.post('/ucd-register/what-happens-next/online-form-option', function(request, response) {
    var previousOnline = request.session.data['form-online']
    if (previousOnline  == 'online'){
        response.redirect('/ucd-register/what-happens-next/online-form-contact')
    } else if (previousOnline  == 'paper') {
        response.redirect('/ucd-register/what-happens-next/paper-whn-1')
    }
})

// Online whn1 (form contact details)
router.post('/ucd-register/what-happens-next/online-form-contact', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/online-whn-1')
})

// Online whn 1- whn 2
router.post('/ucd-register/what-happens-next/online-whn-1', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/online-whn-2')
})

// Online whn 2- paper-after-sent
router.post('/ucd-register/what-happens-next/online-whn-2', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/after-form-sent')
})

router.post('/ucd-register/what-happens-next/previously-claimed-online', function(request, response) {
        response.redirect('/ucd-register/what-happens-next/paper-whn-1')
})

// Paper whn 1- whn 2
router.post('/ucd-register/what-happens-next/paper-whn-1', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/paper-whn-2')
})

// Paper whn 2- paper-after-sent
router.post('/ucd-register/what-happens-next/paper-whn-2', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/after-form-sent')
})

// After-form-sent > end claim and clear session
router.post('/ucd-register/what-happens-next/after-form-sent', function(request, response) {
    response.redirect('/ucd-register/what-happens-next/application-submitted')
})

// -------------------------------------------------------------------------------------
// POST MTP: 
// DIVERT FROM A CLAIM (save and continue button with exit link)

// Delete application or save and come back later
router.post('/ucd-register/save-and-return/save-or-clear-claim', function(request, response) {
    var saveOrClear = request.session.data['save-or-clear']
    if (saveOrClear == 'save-and-return'){
        response.redirect('/ucd-register/save-and-return/application-saved')
    } else if (saveOrClear == 'delete') {
        response.redirect('/ucd-register/save-and-return/are-you-sure-delete-question')
    }
})

// What is your name?
router.post('/ucd-register/save-and-return/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/what-is-your-dob')
})

// What is your DOB
router.post('/ucd-register/save-and-return/contact-details/what-is-your-dob', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/ucd-register/save-and-return/contact-details/what-is-your-phone-number', function(request, response) {
        response.redirect("/ucd-register/save-and-return/contact-details/do-you-want-to-receive-text-updates")
}) 

// Do you want to receive text updates
router.post('/ucd-register/save-and-return/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/ucd-register/save-and-return/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/select-your-address')
})

// Select your address page
router.post('/ucd-register/save-and-return/contact-details/select-your-address', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/ucd-register/save-and-return/contact-details/enter-address-manually-country', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/ucd-register/save-and-return/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/written-format')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/ucd-register/save-and-return/contact-details/correspondence-postcode')
    }
})

// Would you like us to send your letters in another way, like larger text, audio or braille?
router.post('/ucd-register/save-and-return/contact-details/alt-formats/written-format', function(request, response) {
    var writtenFormat = request.session.data['written-format']
    if (writtenFormat == 'standard-letter'){
        response.redirect('/ucd-register/save-and-return/contact-details/contact-details-summary')
    } else if (writtenFormat == 'large-print') {
        response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/large-print')
     } else if (writtenFormat == 'audio') {
        response.redirect('/ucd-register/save-and-return/contact-details/contact-details-summary')
    } else if (writtenFormat == 'braille') {
        response.redirect('/ucd-register/save-and-return/contact-details/contact-details-summary')
    } else if (writtenFormat == 'email') {
        response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/email-reason')
    } else if (writtenFormat == 'pdf') {
        response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/email-reason')
    } 
    
})

// What size print do you need?
router.post('/ucd-register/save-and-return/contact-details/alt-formats/large-print', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/contact-details-summary')
})

// Why do you need us to contact you by email instead of printed letters?
router.post('/ucd-register/save-and-return/contact-details/alt-formats/email-reason', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/what-is-your-email')
})

// What is your email address?
router.post('/ucd-register/save-and-return/contact-details/alt-formats/what-is-your-email', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/contact-details-summary')
})

// What is your correspondence postcode page
router.post('/ucd-register/save-and-return/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/ucd-register/save-and-return/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/written-format')
})

// Confirm correspondence address page
router.post('/ucd-register/save-and-return/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/ucd-register/save-and-return/contact-details/alt-formats/written-format')
})

// Contact details summary page
router.post('/ucd-register/save-and-return/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/ucd-register/save-and-return/task-list-cd-done')
})

// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
// POST MTP: 
// RESUME A CLAIM


//Save and return
router.post('/ucd-register/save-and-return/service-home-call-type', function(request, response) {
    var callType = request.session.data['call-type']
    if (callType  == 'new-claim'){
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/new-ni-claims')
    } else if (callType  == 'resume-application') {
        response.redirect('/ucd-register/save-and-return/self-or-appointee')
    }
})

// self or appointee > search claimant
router.post('/ucd-register/save-and-return/self-or-appointee', function(request, response) {
    var caller = request.session.data['caller-type']
    if (caller == 'self'){
        response.redirect('/ucd-register/save-and-return/search-claimant')
    } else if (caller  == 'legal-appointee') {
        response.redirect('/ucd-register/save-and-return/search-claimant')
    } else if (caller  == 'other') {
        response.redirect('/ucd-register/save-and-return/search-claimant')
    }
})

// claimant search > found nino
router.post('/ucd-register/save-and-return/search-claimant', function(request, response) {
    response.redirect('/ucd-register/save-and-return/security-check')
})

// confirm nino > security check
router.post('/ucd-register/save-and-return/security-check', function(request, response) {
    response.redirect('/ucd-register/save-and-return/nino-found')
})

// security check > access task list
router.post('/ucd-register/save-and-return/security-check', function(request, response) {
    var passed = request.session.data['security-verified']
    if (passed  == 'yes') {
    response.redirect('/ucd-register/save-and-return/task-list-in-progress-hospice')
} else if (passed  == 'no') {
    response.redirect('#')
}
})

// -------------------------------------------------------------------------------------

// CURRENT: NON-MVP PROTOTYPE

// What is your name page
router.post('/current-non-MVP/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/current-non-MVP/contact-details/what-is-your-phone-number', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/current-non-MVP/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/current-non-MVP/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/select-your-address')
})

// Select your address page
router.post('/current-non-MVP/contact-details/select-your-address', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/current-non-MVP/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/current-non-MVP/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/current-non-MVP/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/current-non-MVP/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/current-non-MVP/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/confirm-correspondence-address')
})


// correspondence enter address manually page
router.post('/current-non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/correspondence-alternative-formats')
})

// Confirm correspondence address page
router.post('/current-non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/correspondence-alternative-formats')
})


// Confirm correspondence address manually page
router.post('/current-non-MVP/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/current-non-MVP/contact-details/alternative-formats')
})

// Alternative formats page
router.post('/current-non-MVP/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/current-non-MVP/nationality/start')
    }
})

// Correspondence alternative formats page
router.post('/current-non-MVP/contact-details/correspondence-alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/current-non-MVP/nationality/start')
    }
})

// Contact details summary page
router.post('/current-non-MVP/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/current-non-MVP/nationality/start')
})


//-------------------------------------------------------------------------------------------

//CURRENT: NON-MVP-NATIONALITY

//what is your nationality
router.post('/current-non-MVP/nationality/start', function(request, response) {
    response.redirect('/current-non-MVP/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/current-non-MVP/nationality/what-is-your-nationality', function(request, response) {
    response.redirect('/current-non-MVP/nationality/what-country-do-you-live-in')
})

//what is country do you normally live in page
router.post('/current-non-MVP/nationality/what-country-do-you-live-in', function(request, response) {
    response.redirect('/current-non-MVP/nationality/lived-elsewhere')
})

//Have you lived anywhere other than UK in last 3 years page
router.post('/current-non-MVP/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/current-non-MVP/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/current-non-MVP/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/current-non-MVP/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/current-non-MVP/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/current-non-MVP/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/current-non-MVP/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/current-non-MVP/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/current-non-MVP/healthcare-professional/start')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/current-non-MVP/healthcare-professional/start')
    }
})

//-------------------------------------------------------------------------------------------

//CURRENT: NON-MVP-HEALTHCARE-PROFESSIONAL

//healthcare-prof-type ---> additional support needed
router.post('/current-non-MVP/healthcare-professional/start', function(request, response) {
    response.redirect('/current-non-MVP/healthcare-professional/healthcare-prof-type')
})

//additional support needed ---> additional support needed
router.post('/current-non-MVP/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/current-non-MVP/healthcare-professional/additional-support-needed')
})

//additional-support-needed ---> additional-support-type
router.post('/current-non-MVP/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/current-non-MVP/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/current-non-MVP/additional-support/start-info')
    }
})

//additional-support-type ---> start-info
router.post('/current-non-MVP/healthcare-professional/additional-prof-type', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/start-info')
})

//-------------------------------------------------------------------------------------------

//CURRENT: NON-MVP-ADDITIONAL-SUPPORT

router.post('/current-non-MVP/additional-support/start-info', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/do-you-have-a-condition')
})

router.post('/current-non-MVP/additional-support/do-you-have-a-condition', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/complete-forms')
})

router.post('/current-non-MVP/additional-support/complete-forms', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/read-letters')
})

router.post('/current-non-MVP/additional-support/read-letters', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/post')
})

router.post('/current-non-MVP/additional-support/post', function(request, response) {
        response.redirect('/current-non-MVP/additional-support/helpers')
})

// Do you have anyone to help you?
router.post('/current-non-MVP/additional-support/helpers', function(request, response) {
    var helpers = request.session.data['helpers']
    if (helpers == 'yes'){
        response.redirect('/current-non-MVP/additional-support/who-helps')
    } else if (helpers == 'no') {
        response.redirect('/current-non-MVP/additional-support/advice')
    }
})

router.post('/current-non-MVP/additional-support/who-helps', function(request, response) {
    response.redirect('/current-non-MVP/additional-support/advice')
})

// -------------------------------------------------------------------------------------
//CURRENT: NON-MVP/HOSPITAL-DATES

// Are you in hospital or hospice as an in-patient today?
router.post('/current-non-MVP/hospital-dates/today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/current-non-MVP/hospital-dates/yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/current-non-MVP/hospital-dates/other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/current-non-MVP/hospital-dates/hospice-yesterday')
    }
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/current-non-MVP/hospital-dates/other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/current-non-MVP/hospital-dates/other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('#')
    }
})

// Name and postcode of the hospital
router.post('/current-non-MVP/hospital-dates/postcode', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/select-hospital-address')
})

// Were you in hospital yesterday?
router.post('/current-non-MVP/hospital-dates/yesterday', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/private-patient')
})

// Name and postcode of the hospital
router.post('/current-non-MVP/hospital-dates/select-hospital-address', function(request, response) {
    response.redirect('/current-non-MVP/bank-details/start')
})


// Were you in the hospice yesterday?
router.post('/current-non-MVP/hospital-dates/hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/current-non-MVP/hospital-dates/hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/current-non-MVP/hospital-dates/hospice-postcode')
    }
})

// hospice yesterday > hospice-postcode
router.post('/current-non-MVP/hospital-dates/private-patient', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/hospice-postcode')
})


// private patient > postcode
router.post('/current-non-MVP/hospital-dates/private-patient', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/postcode')
})

// Hospice postcode > Address
router.post('/current-non-MVP/hospital-dates/hospice-postcode', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/select-hospice-address')
})

// Hospice address > bank details start
router.post('/current-non-MVP/hospital-dates/select-hospice-address', function(request, response) {
    response.redirect('/current-non-MVP/bank-details/start')
})

// Do you know the date you went into the hospice?
router.post('/current-non-MVP/hospital-dates/hospice-dates', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/hospice-postcode')
})

// Were you living in this place yesterday?
router.post('/current-non-MVP/hospital-dates/other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/current-non-MVP/hospital-dates/third-party-pay')
    } else if (otherYesterday == 'no') {
        response.redirect('/current-non-MVP/hospital-dates/other-postcode')
    }
})

// Does a local authority, health authority, Jobcentre Plus, or a charity pay any of the costs for you to live there?
router.post('/current-non-MVP/hospital-dates/third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'local'){
        response.redirect('/current-non-MVP/hospital-dates/local-agreement')
    } else if (thirdPartyPay == 'no') {
        response.redirect('/current-non-MVP/hospital-dates/other-postcode')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/current-non-MVP/hospital-dates/other-postcode')
    }
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/current-non-MVP/hospital-dates/local-agreement', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/other-postcode')
})

// Other postcode > address
router.post('/current-non-MVP/hospital-dates/other-postcode', function(request, response) {
    response.redirect('/current-non-MVP/hospital-dates/select-other-address')
})

// Other address > bank details
router.post('/current-non-MVP/hospital-dates/select-other-address', function(request, response) {
    response.redirect('/current-non-MVP/bank-details/start')
})

// -------------------------------------------------------------------------------------

//CURRENT: NON-MVP/BANK-DETAILS/MAIN-ACCOUNT-DETAILS

// Can you give me your account details now?
router.post('/current-non-MVP/bank-details/start', function(request, response) {
    var detailsNow = request.session.data['details-now']
    if (detailsNow == 'yes'){
        response.redirect('/current-non-MVP/bank-details/account-type')
    } else if (detailsNow == 'no') {
        response.redirect('/current-non-MVP/bank-details/no-details-now')
    }
})

// what type of acount is this?
router.post('/current-non-MVP/bank-details/account-type', function(request, response) {
    var accountType = request.session.data['account-type']
    if (accountType == 'main'){
        response.redirect('/current-non-MVP/bank-details/main-account-details')
    } else if (accountType == 'building') {
        response.redirect('/current-non-MVP/bank-details/building-account-details')
    }
})

// You can continue without entering account details
router.post('/current-non-MVP/bank-details/no-details-now', function(request, response) {
    response.redirect('/current-non-MVP/task-list-completed')
})


// -------------------------------------------------------------------------------------

// NEW ROUTE FOR TASK LIST

//CONTACT INFORMATION

//NEW-ORDER/CONTACT-DETAILS

// What is your name page
router.post('/research/sprint-12/new-order/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/do-you-have-phone-number')
})

// Do you have a phone number
router.post('/research/sprint-12/new-order/contact-details/do-you-have-phone-number', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/research/sprint-12/new-order/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/research/sprint-12/new-orderr/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/select-your-address')
})

// Select your address page
router.post('/research/sprint-12/new-order/contact-details/select-your-address', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/research/sprint-12/new-order/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/research/sprint-12/new-order/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/research/sprint-12/new-order/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/research/sprint-12/new-order/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/research/sprint-12/new-order/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/research/sprint-12/new-order/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/correspondence-alternative-formats')
})

// Confirm correspondence address page
router.post('/research/sprint-12/new-order/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/research/sprint-12/new-order/contact-details/correspondence-alternative-formats')
})

// Correspondence alternative formats page
router.post('/research/sprint-12/new-order/contact-details/correspondence-alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/research/sprint-12/new-order/contact-details/contact-details-correspondence-summary')
    }
})


// Alternative formats page
router.post('/research/sprint-12/new-order/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/research/sprint-12/new-order/contact-details/contact-details-summary')
    }
})

// Contact details summary page
router.post('/research/sprint-12/new-order/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/research/sprint-12/new-order/task-list')
})


// -------------------------------------------------------------------------------------

//NEW-ORDER/ADDITIONAL-SUPPORT

router.post('/research/sprint-12/new-order/additional-support/start-info', function(request, response) {
    response.redirect('/research/sprint-12/new-order/additional-support/do-you-have-a-condition')
})

// do you have a condition 
router.post('/research/sprint-12/new-order/additional-support/do-you-have-a-condition', function(request, response) {
    var condition = request.session.data['condition']
    if (condition == 'yes'){
        response.redirect('/research/sprint-12/new-order/additional-support/complete-forms')
    } else if (condition == 'no') {
        response.redirect('/research/sprint-12/new-order/additional-support/complete-forms')
    }
})

// can you complete forms
router.post('/research/sprint-12/new-order/additional-support/complete-forms', function(request, response) {
    var completeForms = request.session.data['complete-forms']
    if (completeForms == 'yes'){
        response.redirect('/research/sprint-12/new-order/additional-support/read-letters')
    } else if (completeForms == 'no') {
        response.redirect('/research/sprint-12/new-order/additional-support/read-letters')
    }
})

router.post('/research/sprint-12/new-order/additional-support/read-letters', function(request, response) {
    response.redirect('/research/sprint-12/new-order/additional-support/post')
})

router.post('/research/sprint-12/new-order/additional-support/post', function(request, response) {
    response.redirect('/research/sprint-12/new-order/additional-support/helpers')
})

// Do you have anyone to help you?
router.post('/research/sprint-12/new-order/additional-support/helpers', function(request, response) {
    var anyoneHelp = request.session.data['helpers']
    if (anyoneHelp == 'yes'){
        response.redirect('/research/sprint-12/new-order/additional-support/who-helps')
    } else if (anyoneHelp == 'no') {
        response.redirect('/research/sprint-12/new-order/additional-support/advice')
    }
})

router.post('/research/sprint-12/new-order/additional-support/who-helps', function(request, response) {
    response.redirect('/research/sprint-12/new-order/additional-support/advice')
})


// -------------------------------------------------------------------------------------
//NATIONALITY, WORK AND RESIDENCE

//NEW-ORDER/NATIONALITY

//what is your nationality
router.post('/research/sprint-12/new-order/nationality/what-is-your-nationality', function(request, response) {
    response.redirect('/research/sprint-12/new-order/nationality/what-country-do-you-live-in')
})

//what is country do you normally live in page
router.post('/research/sprint-12/new-order/nationality/what-country-do-you-live-in', function(request, response) {
    response.redirect('/research/sprint-12/new-order/nationality/lived-elsewhere')
})

//Have you lived anywhere other than UK in last 3 years page
router.post('/research/sprint-12/new-order/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/research/sprint-12/new-order/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/research/sprint-12/new-order/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/research/sprint-12/new-order/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/research/sprint-12/new-order/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/research/sprint-12/new-order/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/research/sprint-12/new-order/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/research/sprint-12/new-order/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/research/sprint-12/new-order/nationality/nationality-summary')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/research/sprint-12/new-order/nationality/nationality-summary')
    }
})

//For MTP in backlog-Eligibility route 

// What is your name
router.post('/versions/UCD/signposting-eligibility/service-start-page', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-dob')
})

// What is your DOB
router.post('/ucd-register/contact-details/what-is-your-dob', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/ucd-register/contact-details/what-is-your-phone-number', function(request, response) {
        response.redirect("/ucd-register/contact-details/do-you-want-to-receive-text-updates")
}) 

// What is your Textphone number?
router.post('/ucd-register/contact-details/alt-formats/what-is-your-textphone-number', function(request, response) {
    response.redirect('/ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// What signing or lipspeaking service do you need?
router.post('/ucd-register/contact-details/alt-formats/signing-lipspeaking', function(request, response) {
    response.redirect('/ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/ucd-register/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/ucd-register/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/ucd-register/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/ucd-register/contact-details/select-your-address')
})

// Select your address page
router.post('/ucd-register/contact-details/select-your-address', function(request, response) {
    response.redirect('/ucd-register/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/ucd-register/contact-details/enter-address-manually-country', function(request, response) {
    response.redirect('/ucd-register/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/ucd-register/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/ucd-register/contact-details/alt-formats/written-format')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/ucd-register/contact-details/correspondence-postcode')
    }
})

// Would you like us to send your letters in another way, like larger text, audio or braille?
router.post('/ucd-register/contact-details/alt-formats/written-format', function(request, response) {
    var writtenFormat = request.session.data['written-format']
    if (writtenFormat == 'standard-letter'){
        response.redirect('/ucd-register/task-list-cd-done')
    } else if (writtenFormat == 'large-print') {
        response.redirect('/ucd-register/contact-details/alt-formats/large-print')
     } else if (writtenFormat == 'audio') {
        response.redirect('/ucd-register/contact-details/contact-details-summary')
    } else if (writtenFormat == 'braille') {
        response.redirect('/ucd-register/contact-details/contact-details-summary')
    } else if (writtenFormat == 'email') {
        response.redirect('/ucd-register/contact-details/alt-formats/email-reason')
    } else if (writtenFormat == 'pdf') {
        response.redirect('/ucd-register/contact-details/alt-formats/email-reason')
    } 
    
})

// What size print do you need?
router.post('/ucd-register/contact-details/alt-formats/large-print', function(request, response) {
    response.redirect('/ucd-register/contact-details/contact-details-summary')
})

// Why do you need us to contact you by email instead of printed letters?
router.post('/ucd-register/contact-details/alt-formats/email-reason', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/what-is-your-email')
})

// What is your email address?
router.post('/ucd-register/contact-details/alt-formats/what-is-your-email', function(request, response) {
    response.redirect('/ucd-register/contact-details/contact-details-summary')
})

// What is your correspondence postcode page
router.post('/ucd-register/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/ucd-register/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/ucd-register/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/written-format')
})

// Confirm correspondence address page
router.post('/ucd-register/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/ucd-register/contact-details/alt-formats/written-format')
})

// Contact details summary page
router.post('/ucd-register/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/ucd-register/task-list-cd-done')
})

// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
//HEALTHCARE AND SUPPORT

//NEW-ORDER/HEALTHCARE-PROFESSIONAL

//healthcare-prof-type ---> what is their postcode
router.post('/research/sprint-12/new-order/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/postcode')
})

//healthcare-prof-type ---> find address
router.post('/research/sprint-12/new-order/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/postcode')
})

//find address ---> select address
router.post('/research/sprint-12/new-order/healthcare-professional/postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/select-your-address')
})

//select address ---> addiitonal support needed
router.post('/research/sprint-12/new-order/select-your-address', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/additional-support-needed')
})

//enter-address-manually ----> second support needed?
router.post('/research/sprint-12/new-order/healthcare-professional/enter-address-manually', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/additional-support-needed')
})

//additional-support-needed ---> additional-support-type
router.post('/research/sprint-12/new-order/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/research/sprint-12/new-order/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/research/sprint-12/new-order/healthcare-professional/hp-summary')
    }
})

//additional-support-type ---> find address
router.post('/research/sprint-12/new-order/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/postcode-support')
})

//find address ---> select address
router.post('/research/sprint-12/new-order/healthcare-professional/postcode-support', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/select-support-address')
})

//enter-address-manually ----> hp summary
router.post('/research/sprint-12/new-order/healthcare-professional/support-address-manually', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/hp-summary')
})


//select support address ---> hp summary
router.post('/research/sprint-12/new-order/healthcare-professional/select-support-address', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/hp-summary')
})

//CYA ----> consent NI
router.post('/research/sprint-12/new-order/healthcare-professional/hp-summary', function(request, response) {
    response.redirect('/research/sprint-12/new-order/healthcare-professional/consent-NI')
})

//consent NI ----> task list
router.post('/research/sprint-12/new-order/healthcare-professional/consent-NI', function(request, response) {
    response.redirect('/research/sprint-12/new-order/task-list-in-progress-hcp-done')
})

// -------------------------------------------------------------------------------------

//NEW-ORDER/HOSPITAL-DATES

// Are you in hospital or hospice as an in-patient today?
router.post('/research/sprint-12/new-order/hospital-dates/5-2-today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-4-yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-3-other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-8-hospice-yesterday')
    }
})

// Were you in hospital yesterday?
router.post('/research/sprint-12/new-order/hospital-dates/5-4-yesterday', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-5-private-patient')
})


// are you a private patient? > What is the name and address of the hospital?
router.post('/research/sprint-12/new-order/hospital-dates/5-5-private-patient', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-6-postcode')
})

// postcode > select address
router.post('/research/sprint-12/new-order/hospital-dates/5-6-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-7-select-hospital-address')
})

// Were you in hospice yesterday?
router.post('/research/sprint-12/new-order/hospital-dates/5-8-hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-9-hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-10-hospice-postcode')
    }
})

// Do you know the date you went into the hospice?
router.post('/research/sprint-12/new-order/hospital-dates/5-9-hospice-dates', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-10-hospice-postcode')
})

// select hospice address
router.post('/research/sprint-12/new-order/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-11-select-hospice-address')
})

// select hospice address
router.post('/research/sprint-12/new-order/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-11-select-hospice-address')
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/research/sprint-12/new-order/hospital-dates/5-3-other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-12-other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('#')
    }
})

// Were you living in this place yesterday?
router.post('/research/sprint-12/new-order/hospital-dates/5-12-other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-13-third-party-pay')
    } else if (otherYesterday == 'no') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-13-third-party-pay')
    }
})

// Does a local authority, health authority, Jobcentre Plus, or a charity pay any of the costs for you to live there?
router.post('/research/sprint-12/new-order/hospital-dates/5-13-third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'local'){
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-14-local-agreement')
    } else if (thirdPartyPay == 'no') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-15-other-postcode')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/research/sprint-12/new-order/hospital-dates/5-15-other-postcode')
    }
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/research/sprint-12/new-order/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-15-other-postcode')
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/research/sprint-12/new-order/hospital-dates/5-15-other-postcode', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/5-16-select-other-address')
})

// Select other address > tasklist
router.post('/research/sprint-12/new-order/hospital-dates/5-16-select-other-address', function(request, response) {
    response.redirect('/research/sprint-12/new-order/hospital-dates/other-residence-summary')
})

// CYA > task list
router.post('/research/sprint-12/new-order/hospital-dates/other-residence-summary', function(request, response) {
    response.redirect('/research/sprint-12/new-order/task-list-in-progress-hospice')
})


// -------------------------------------------------------------------------------------

//BANK DETAILS

//NEW-ORDER/BANK-DETAILS/MAIN-ACCOUNT-DETAILS

// Can you give me your account details now?
router.post('/research/sprint-12/new-order/bank-details/6-1-start', function(request, response) {
    var detailsNow = request.session.data['details-now']
    if (detailsNow == 'yes'){
        response.redirect('/research/sprint-12/new-order/bank-details/6-3-main-account-details-v2')
    } else if (detailsNow == 'no') {
        response.redirect('/research/sprint-12/new-order/bank-details/6-2-no-details-now')
    }
})

// You can continue without entering account details
router.post('/research/sprint-12/new-orderbank-details/6-2-no-details-now', function(request, response) {
    response.redirect('/research/sprint-12/new-order/declaration')
})

// -------------------------------------------------------------------------------------


// ITERATION 1: NON-MVP PROTOTYPE

// What is your name page
router.post('/non-MVP/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/non-MVP/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/non-MVP/contact-details/what-is-your-phone-number', function(request, response) {
    response.redirect('/non-MVP/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/non-MVP/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/non-MVP/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/non-MVP/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/non-MVP/contact-details/select-your-address')
})

// Select your address page
router.post('/non-MVP/contact-details/select-your-address', function(request, response) {
    response.redirect('/non-MVP/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/non-MVP/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/non-MVP/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/non-MVP/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/non-MVP/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/non-MVP/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/non-MVP/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/non-MVP/contact-details/confirm-correspondence-address')
})


// correspondence enter address manually page
router.post('/non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/non-MVP/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/non-MVP/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/non-MVP/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/non-MVP/contact-details/alternative-formats')
})

// Alternative formats page
router.post('/non-MVP/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/non-MVP/nationality/what-is-your-nationality')
    }
})

// Contact details summary page
router.post('/non-MVP/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/non-MVP/nationality/what-is-your-nationality')
})


//-------------------------------------------------------------------------------------------

//ITERATION 1: NON-MVP-NATIONALITY

//what is your nationality
router.post('/non-MVP/nationality/what-is-your-nationality', function(request, response) {
    response.redirect('/non-MVP/nationality/what-country-do-you-live-in')
})

//what is country do you normally live in page
router.post('/non-MVP/nationality/what-country-do-you-live-in', function(request, response) {
    response.redirect('/non-MVP/nationality/lived-elsewhere')
})

//Have you lived anywhere other than UK in last 3 years page
router.post('/non-MVP/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/non-MVP/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/non-MVP/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/non-MVP/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/non-MVP/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/non-MVP/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/non-MVP/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/non-MVP/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/non-MVP/healthcare-professional/start')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/non-MVP/healthcare-professional/start')
    }
})

//-------------------------------------------------------------------------------------------

//ITERATION 1: NON-MVP-HEALTHCARE-PROFESSIONAL

//healthcare-prof-type ---> additional support needed
router.post('/non-MVP/healthcare-professional/start', function(request, response) {
    response.redirect('/non-MVP/healthcare-professional/healthcare-prof-type')
})

//additional support needed ---> additional support needed
router.post('/non-MVP/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/non-MVP/healthcare-professional/additional-support-needed')
})

//additional-support-needed ---> additional-support-type
router.post('/non-MVP/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/non-MVP/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/non-MVP/additional-support/start-info')
    }
})

//additional-support-type ---> start-info
router.post('/non-MVP/healthcare-professional/additional-prof-type', function(request, response) {
    response.redirect('/non-MVP/additional-support/start-info')
})

//-------------------------------------------------------------------------------------------

//ITERATION 1: NON-MVP-ADDITIONAL-SUPPORT

router.post('/non-MVP/additional-support/start-info', function(request, response) {
    response.redirect('/non-MVP/additional-support/do-you-have-a-condition')
})

router.post('/non-MVP/additional-support/do-you-have-a-condition', function(request, response) {
    response.redirect('/non-MVP/additional-support/complete-forms')
})

router.post('/non-MVP/additional-support/complete-forms', function(request, response) {
    response.redirect('/non-MVP/additional-support/read-letters')
})

router.post('/non-MVP/additional-support/read-letters', function(request, response) {
    response.redirect('/non-MVP/additional-support/post')
})

router.post('/non-MVP/additional-support/post', function(request, response) {
        response.redirect('/non-MVP/additional-support/helpers')
})

router.post('/non-MVP/additional-support/helpers', function(request, response) {
        response.redirect('/non-MVP/additional-support/who-helps')
})

router.post('/non-MVP/additional-support/who-helps', function(request, response) {
    response.redirect('/non-MVP/additional-support/advice')
})


//-------------------------------------------------------------------------------------------

// RESEARCH SPRINT 19 - ELIGIBILITY ROUTES

// welcome to PIP
router.post('/research/sprint-19/signposting-eligibility/service-start-page', function(request, response) {
    var newClaim = request.session.data['welcome']
    if (newClaim == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/new-ni-claims')
    } else if (newClaim == "no") {
        response.redirect('/research/sprint-19/signposting-eligibility/existing-claims')
    }
})

// NI new claims
router.post('/research/sprint-19/signposting-eligibility/new-ni-claims', function(request, response) {
    var niPip = request.session.data['ni-pip']
    if (niPip == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/claiming-self')
    } else if (niPip == "england-wales") {
        response.redirect('/research/sprint-19/signposting-eligibility/england-wales')
    } else if (niPip == "scotland") {
        response.redirect('/research/sprint-19/signposting-eligibility/scotland')
    }
})

// Are you claiming for yourself?
router.post('/research/sprint-19/signposting-eligibility/claiming-self', function(request, response) {
    var self = request.session.data['claiming-self']
    if (self == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/srel')
    } else if (self == "no") {
        response.redirect('/research/sprint-19/signposting-eligibility/srel-bau-kickout')
    } 
})

// Claiming under SREL?
router.post('/research/sprint-19/signposting-eligibility/srel', function(request, response) {
    var srel = request.session.data['srel']
    if (srel == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/srel-bau-kickout')
    } else if (srel == "no") {
        response.redirect('/research/sprint-19/signposting-eligibility/over-16')
    } 
})

// Authorised person
router.post('/research/sprint-19/signposting-eligibility/authorised-person', function(request, response) {
    var authorised = request.session.data['authorised-person']
    if (authorised == 'authorised'){
        response.redirect('/research/sprint-19/signposting-eligibility/third-party-route')
    } else if (authorised == "appointed") {
        response.redirect('/research/sprint-19/signposting-eligibility/external-party-route')
    } else if (authorised == "neither") {
        response.redirect('/research/sprint-19/signposting-eligibility/end-call')
    } 
})

// Are you over 16?
router.post('/research/sprint-19/signposting-eligibility/over-16', function(request, response) {
    var over16 = request.session.data['over-16']
    if (over16 == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/under-state-pension')
    } else if (over16 == "no") {
        response.redirect('/research/sprint-19/signposting-eligibility/under-16-ineligible')
    }
})

// Are you under state pension age?
router.post('/research/sprint-19/signposting-eligibility/under-state-pension', function(request, response) {
    var underState = request.session.data['under-state-pension']
    if (underState == 'yes'){
        response.redirect('/research/sprint-19/signposting-eligibility/what-is-ni-number')
    } else if (underState == "no") {
        response.redirect('/research/sprint-19/signposting-eligibility/stop-getting-pip-last-year')
    }
})

// What is your National Insurance number?
router.post('/research/sprint-19/signposting-eligibility/what-is-ni-number', function(request, response) {
    response.redirect('/research/sprint-19/signposting-eligibility/security-check')
})

// What security questions were answered?
router.post('/research/sprint-19/signposting-eligibility/security-check', function(request, response) {
    response.redirect('/research/sprint-19/signposting-eligibility/passed-security')
})

// Passed security
router.post('/research/sprint-19/signposting-eligibility/passed-security', function(request, response) {
    response.redirect('/index')
})

// ----------------------------------------------------------------------------------------------------------------

// RESEARCH: NON-MVP PROTOTYPE


//RESEARCH/SPRINT-8/CONTACT-DETAILS

// What is your name page
router.post('/research/sprint-8/non-MVP/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/research/sprint-8/non-MVP/contact-details/what-is-your-phone-number', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/research/sprint-8/non-MVP/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/research/sprint-8/non-MVP/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/select-your-address')
})

// Select your address page
router.post('/research/sprint-8/non-MVP/contact-details/select-your-address', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/research/sprint-8/non-MVP/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/research/sprint-8/non-MVP/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/research/sprint-8/non-MVP/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/research/sprint-8/non-MVP/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/research/sprint-8/non-MVP/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/confirm-correspondence-address')
})


// correspondence enter address manually page
router.post('/research/sprint-8/non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/research/sprint-8/non-MVP/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/research/sprint-8/non-MVP/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/contact-details/alternative-formats')
})

// Alternative formats page
router.post('/research/sprint-8/non-MVP/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/research/sprint-8/non-MVP/nationality/what-is-your-nationality')
    }
})

// Contact details summary page
router.post('/research/sprint-8/non-MVP/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/nationality/what-is-your-nationality')
})

//-------------------------------------------------------------------------------------------

//RESEARCH/SPRINT-12/NEW EEA ROUTE

//Are you working or paying national insurance in another country?
router.post('/research/sprint-12/original/working-paying-insurance-abroad', function(request, response) {
    var payingInsurance= request.session.data['insurance-abroad']
    if (payingInsurance == 'no'){
        response.redirect('/research/sprint-12/original/family-paying-insurance-abroad')
    } else if (payingInsurance == 'yes') {
        response.redirect('/research/sprint-12/original/receiving-benefits')
    }
})

//Are any of your family members working or paying national insurance in another country?
router.post('/research/sprint-12/original/family-paying-insurance-abroad', function(request, response) {
    var livedElsewhere = request.session.data['family-insurance-abroad']
    if (livedElsewhere == 'no'){
        response.redirect('/research/sprint-12/original/receiving-benefits')
    } else if (livedElsewhere == 'yes') {
        response.redirect('/research/sprint-12/original/which-family-paying-insurance')
    }
})

//Which of your family members are working or paying national insurance in this country?
router.post('/research/sprint-12/original/which-family-paying-insurance', function(request, response) {
    var livedElsewhere = request.session.data['which-family-member']
    if (livedElsewhere == 'spouse-another'){
        response.redirect('/research/sprint-12/original/receiving-benefits')
    } else if (livedElsewhere == 'parent') {
        response.redirect('/research/sprint-12/original/financially-dependant')
    }
})

// Are you financially dependent on the parent who is working or paying national insurance in this country?
router.post('/research/sprint-12/original/financially-dependant', function(request, response) {
    response.redirect('/research/sprint-12/original/receiving-benefits')
})

//Are you receiving pensions or benefits in another country?
router.post('/research/sprint-12/original/receiving-benefits', function(request, response) {
    var receivingBenefits= request.session.data['receiving-benefits']
    if (receivingBenefits == 'no'){
        response.redirect('/research/sprint-12/original/family-receiving-benefits')
    } else if (receivingBenefits == 'yes') {
        response.redirect('/research/sprint-12/original/nationality-summary')
    }
})

//Are any of your family members receiving pensions or benefits in another country?
router.post('/research/sprint-12/original/family-receiving-benefits', function(request, response) {
    var familyBenefits= request.session.data['family-receiving-benefits']
    if (familyBenefits == 'no'){
        response.redirect('/research/sprint-12/original/nationality-summary')
    } else if (familyBenefits == 'yes') {
        response.redirect('/research/sprint-12/original/which-family-receiving-benefits')
    }
})

//Which of your family members are receiving pensions or benefits in another country?
router.post('/research/sprint-12/original/which-family-receiving-benefits', function(request, response) {
    var whichDependant = request.session.data['which-family-benefits']
    if (whichDependant == 'spouse-another'){
        response.redirect('/research/sprint-12/original/nationality-summary')
    } else if (whichDependant == 'parent') {
        response.redirect('/research/sprint-12/original/financially-dependant-benefits')
    }
})

// Are you financially dependent on the parent who is receiving pensions or benefits in this country?
router.post('/research/sprint-12/original/financially-dependant-benefits', function(request, response) {
    response.redirect('/research/sprint-12/original/nationality-summary')
})

//-------------------------------------------------------------------------------------------

//RESEARCH/SPRINT-12/EXPORTABILITY EEA ROUTE

//Are you working or paying national insurance in another country?

 router.post('/research/sprint-12/exportability/working-paying-insurance-abroad', function(request, response) {
  var payingInsurance= request.session.data['insurance-abroad']
  if (payingInsurance == 'no'){
    response.redirect('/research/sprint-12/exportability/family-paying-insurance-abroad')
  } else if (payingInsurance == 'yes') {
      response.redirect('/research/sprint-12/exportability/receiving-benefits')
  }
})

//Are any of your family members working or paying national insurance in another country?
router.post('/research/sprint-12/exportability/family-paying-insurance-abroad', function(request, response) {
    response.redirect('/research/sprint-12/exportability/receiving-benefits')
})

// Are you receiving pensions or benefits in another country?
router.post('/research/sprint-12/exportability/receiving-benefits', function(request, response) {
    var payingInsurance= request.session.data['receiving-benefits']
    if (payingInsurance == 'no'){
      response.redirect('/research/sprint-12/exportability/family-receiving-benefits')
    } else if (payingInsurance == 'yes') {
        response.redirect('/research/sprint-12/exportability/nationality-summary')
    }
})

//Are any of your family members receiving pensions or benefits in another country?
router.post('/research/sprint-12/exportability/family-receiving-benefits', function(request, response) {
    response.redirect('/research/sprint-12/exportability/nationality-summary')
})

//-------------------------------------------------------------------------------------------

//RESEARCH/SPRINT-8/NATIONALITY

//what is your nationality
router.post('/research/sprint-8/non-MVP/nationality/what-is-your-nationality', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/nationality/what-country-do-you-live-in')
})

//what is country do you normally live in page
router.post('/research/sprint-8/non-MVP/nationality/what-country-do-you-live-in', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/nationality/lived-elsewhere')
})

//Have you lived anywhere other than UK in last 3 years page
router.post('/research/sprint-8/non-MVP/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/research/sprint-8/non-MVP/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/research/sprint-8/non-MVP/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/research/sprint-8/non-MVP/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/research/sprint-8/non-MVP/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/research/sprint-8/non-MVP/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/research/sprint-8/non-MVP/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/research/sprint-8/non-MVP/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/research/sprint-8/non-MVP/healthcare-professional/start')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/research/sprint-8/non-MVP/healthcare-professional/start')
    }
})

//start
router.post('/research/sprint-8/non-MVP/healthcare-professional/start', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/nhealthcare-professional/healthcare-prof-type')
})


//-------------------------------------------------------------------------------------------

//RESEARCH/SPRINT-8/HEALTHCARE-PROFESSIONAL

//healthcare-prof-type ---> additional support needed
router.post('/research/sprint-8/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/research/sprint-8/healthcare-professional/additional-support-needed')
})

//additional-support-needed ---> additional-support-type
router.post('/research/sprint-8/non-MVP/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/research/sprint-8/non-MVP/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/research/sprint-8/non-MVP/additional-support/start-info')
    }
})

//consent ---> hp summary
router.post('/research/sprint-8/healthcare-professional/consent', function(request, response) {
    response.redirect('/research/sprint-8/healthcare-professional/hp-summary-two')
})

//additional-support-type ---> start-info
router.post('/research/sprint-8/non-MVP/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/start-info')
})

//------------------------------------------------------------------------------------------------------

//CURRENT: NON-MVP-ADDITIONAL-SUPPORT

router.post('/research/sprint-8/non-MVP/additional-support/start-info', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/do-you-have-a-condition')
})

router.post('/research/sprint-8/non-MVP/additional-support/do-you-have-a-condition', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/complete-forms')
})

router.post('/research/sprint-8/non-MVP/additional-support/complete-forms', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/read-letters')
})

router.post('/research/sprint-8/non-MVP/additional-support/read-letters', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/post')
})

router.post('/research/sprint-8/non-MVP/additional-support/post', function(request, response) {
        response.redirect('/research/sprint-8/non-MVP/additional-support/helpers')
})

router.post('/research/sprint-8/non-MVP/additional-support/helpers', function(request, response) {
        response.redirect('/research/sprint-8/non-MVP/additional-support/who-helps')
})

router.post('/research/sprint-8/non-MVP/additional-support/who-helps', function(request, response) {
    response.redirect('/research/sprint-8/non-MVP/additional-support/advice')
})


//-------------------------------------------------------------------------------------------

// RESEARCH/VERSIONS/SPRINT-6/CONTACT-DETAILS

// What is your name page
router.post('/versions/sprint-6/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/versions/sprint-6/contact-details/what-is-your-phone-number', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/versions/sprint-6/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/versions/sprint-6/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/select-your-address')
})

// Select your address page
router.post('/versions/sprint-6/contact-details/select-your-address', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/versions/sprint-6/contact-details/enter-address-manually', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/versions/sprint-6/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/versions/sprint-6/contact-details/alternative-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/versions/sprint-6/contact-details/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/versions/sprint-6/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/confirm-correspondence-address')
})


// correspondence enter address manually page
router.post('/versions/sprint-6/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/versions/sprint-6/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/alternative-formats')
})

// Confirm correspondence address page
router.post('/versions/sprint-6/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/versions/sprint-6/contact-details/alternative-formats')
})

// Alternative formats page
router.post('/versions/sprint-6/contact-details/alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/versions/sprint-6/contact-details/contact-details-summary')
    }
})

// Contact details summary page
router.post('/versions/sprint-6/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/versions/sprint-6/task-list')
})

//-------------------------------------------------------------------------------------------

// RESEARCH-SPRINT-20

// Save application- i will now submit
router.post('/design-updates/what-happens-next/save-application', function(request, response) {
    response.redirect('/design-updates/what-happens-next/what-happens-next')
})
//design-updates/sprint-20/what-happens-next/what-happens-next
router.post('/design-updates/what-happens-next/what-happens-next', function(request, response) {
    var previousOnline = request.session.data['previous-online-claim']
    if (previousOnline  == 'yes'){
        response.redirect('/design-updates/what-happens-next/paper-whn-1')
    } else if (previousOnline  == 'no') {
        response.redirect('/design-updates/what-happens-next/online-form-option')
    }
})

router.post('/design-updates/what-happens-next/online-form-option', function(request, response) {
    var previousOnline = request.session.data['form-online']
    if (previousOnline  == 'online'){
        response.redirect('/design-updates/what-happens-next/online-form-contact')
    } else if (previousOnline  == 'paper') {
        response.redirect('/design-updates/what-happens-next/paper-whn-1')
    }
})

// Online whn1 (form contact details)
router.post('/design-updates/what-happens-next/online-form-contact', function(request, response) {
    response.redirect('/design-updates/what-happens-next/online-whn-1')
})

// Online whn 1- whn 2
router.post('/design-updates/what-happens-next/online-whn-1', function(request, response) {
    response.redirect('/design-updates/what-happens-next/online-whn-2')
})

// Online whn 2- paper-after-sent
router.post('/design-updates/what-happens-next/online-whn-2', function(request, response) {
    response.redirect('/design-updates/what-happens-next/after-form-sent')
})

router.post('/design-updates/what-happens-next/previously-claimed-online', function(request, response) {
        response.redirect('/design-updates/what-happens-next/paper-whn-1')
})

// Paper whn 1- whn 2
router.post('/design-updates/what-happens-next/paper-whn-1', function(request, response) {
    response.redirect('/design-updates/what-happens-next/paper-whn-2')
})

// Paper whn 2- paper-after-sent
router.post('/design-updates/what-happens-next/paper-whn-2', function(request, response) {
    response.redirect('/design-updates/what-happens-next/after-form-sent')
})

// After-form-sent > end claim and clear session
router.post('/design-updates/what-happens-next/after-form-sent', function(request, response) {
    response.redirect('/design-updates/what-happens-next/end-clear-session')
})
//-------------------------------------------------------------------------------------------

// RESEARCH/PIP-CS/ADD-SUPPORT

// Alternative formats page
router.post('/research/pipcs/add-support/read-letters', function(request, response) {
    var readLetters = request.session.data['read-letters']
    if (readLetters == 'yes'){
        response.redirect('/research/pipcs/add-support/helpers')
    } else if (readLetters == 'no') {
        response.redirect('/research/pipcs/add-support/difficulty-communicating')
    }
})

//-------------------------------------------------------------------------------------------

// MTP-BACKLOG

// Do you know the date you entered the hospice? > what was the date
router.post('/v2-ucd-register/hospital-dates/mtp-backlog/5-8-know-hospice-date', function(request, response) {
    var knowDate = request.session.data['know-the-date']
    if (knowDate == 'today'){
        response.redirect('/ucd-register/hospital-dates/5-10-hospice-postcode')
    } else if (knowDate == 'before-today') {
        response.redirect('/v2-ucd-register/hospital-dates/mtp-backlog/5-9-hospice-date')
    } else if (knowDate == 'no') {
        response.redirect('/ucd-register/hospital-dates/5-10-hospice-postcode')
    }
})

// -------------------------------------------------------------------------------------

//ucd-register/contact-details

// What is your name page
router.post('/versions/devs/what-is-your-name', function(request, response) {
    response.redirect('/versions/devs/do-you-have-a-previous-last-name')
})

// Do you have a previous last name?
router.post('/versions/devs/do-you-have-a-previous-last-name', function(request, response) {
    response.redirect('/versions/devs/what-is-your-phone-number')
})

// What is your phone number page
router.post('/versions/devs/what-is-your-phone-number', function(request, response) {
    response.redirect('/versions/devs/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/versions/devs/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/versions/devs/what-is-your-postcode')
})

// What is your postcode page
router.post('/versions/devs/what-is-your-postcode', function(request, response) {
    response.redirect('/versions/devs/select-your-address')
})

// Select your address page
router.post('/versions/devs/select-your-address', function(request, response) {
    response.redirect('/versions/devs/correspondence-address')
})

// Enter address manually page
router.post('/versions/devs/enter-address-manually-country', function(request, response) {
    response.redirect('/versions/devs/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/versions/devs/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/versions/devs/dev-alt-formats')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/versions/devs/correspondence-postcode')
    }
})

// What is your correspondence postcode page
router.post('/versions/devs/correspondence-postcode', function(request, response) {
    response.redirect('/versions/devs/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/versions/devs/confirm-correspondence-address', function(request, response) {
    response.redirect('/versions/devs/correspondence-alternative-formats')
})

// Confirm correspondence address page
router.post('/versions/devs/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/versions/devs/correspondence-alternative-formats')
})

// Correspondence alternative formats page
router.post('/versions/devs/correspondence-alternative-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('//versions/devs/contact-details-correspondence-summary')
    }
})


// Alternative formats page
router.post('/versions/devs/dev-alt-formats', function(request, response) {
    var differentFormat = request.session.data['different-format']
    if (differentFormat == 'yes'){
        response.redirect('#')
    } else if (differentFormat == 'no') {
        response.redirect('/versions/devs/contact-details-summary')
    }
})

// Contact details summary page
router.post('/versions/devs/contact-details-summary', function(request, response) {
    response.redirect('/versions/devs/task-list')
})

// -------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------

// Post MTP Eligibility and signposting route

// Eligibility launched from main UI
router.post('/versions/UCD/post-mtp-sign-eligibility/service-start-page', function(request, response) {
    var newClaim = request.session.data['welcome']
    if (newClaim == 'yes'){
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/new-ni-claims')
    } else if (newClaim == "no") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/existing-claims')
    }
    })
    
    // NI new claims
    router.post('/versions/UCD/post-mtp-sign-eligibility/new-ni-claims', function(request, response) {
    var niPip = request.session.data['ni-pip']
    if (niPip == 'yes'){
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/claiming-self')
    } else if (niPip == "england-wales") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/england-wales')
    } else if (niPip == "scotland") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/scotland')
    }
    })
    
    // Are you claiming for yourself?
    router.post('/versions/UCD/post-mtp-sign-eligibility/claiming-self', function(request, response) {
    var self = request.session.data['claiming-self']
    if (self == 'yes'){
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/over-16')
    } else if (self == "no") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/someone-else-bau-kickout')
    } 
    })
    
    // Are you over 16?
    router.post('/versions/UCD/post-mtp-sign-eligibility/over-16', function(request, response) {
    var over16 = request.session.data['age']
    if (over16 == 'yes'){
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/security-check-2')
    } else if (over16 == "no-under-16") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/under-16-ineligible')
    } else if (over16 == "no-over-spa") {
        response.redirect('/versions/UCD/post-mtp-sign-eligibility/stop-getting-pip-last-year')
    }
    })

    // What security questions were answered?
    router.post('/versions/UCD/post-mtp-sign-eligibility/security-check-2', function(request, response) {
        var passed = request.session.data['security-verified']
        if (passed == "passed"){
            response.redirect('/versions/UCD/post-mtp-sign-eligibility/srel')
        } else if (passed == "more-needed") {
            response.redirect('/versions/UCD/post-mtp-sign-eligibility/failed-security')
        }
        })

    // Claiming under SREL?
    router.post('/versions/UCD/post-mtp-sign-eligibility/srel', function(request, response) {
        var srel = request.session.data['srel']
        if (srel == 'yes'){
            response.redirect('/versions/UCD/post-mtp-sign-eligibility/srel-bau-kickout')
        } else if (srel == "no") {
            response.redirect('/ucd-concepts-testing')
        } 
        })

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------



// V2-UCD-REGISTER/Contact-details

// What is your name
router.post('/v2-ucd-register/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/what-is-your-dob')
})

// What is your DOB?
router.post('/v2-ucd-register/contact-details/what-is-your-dob', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/v2-ucd-register/contact-details/what-is-your-phone-number', function(request, response) {
        response.redirect("/v2-ucd-register/contact-details/do-you-want-to-receive-text-updates")
}) 

// What is your Textphone number?
router.post('/v2-ucd-register/contact-details/alt-formats/what-is-your-textphone-number', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// What signing or lipspeaking service do you need?
router.post('/v2-ucd-register/contact-details/alt-formats/signing-lipspeaking', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/v2-ucd-register/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/v2-ucd-register/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/select-your-address')
})

// Select your address page
router.post('/v2-ucd-register/contact-details/select-your-address', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/v2-ucd-register/contact-details/enter-address-manually-country', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/v2-ucd-register/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/v2-ucd-register/contact-details/alt-formats/written-format')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/v2-ucd-register/contact-details/correspondence-postcode')
    }
})

// Would you like us to send your letters in another way, like larger text, audio or braille?
router.post('/v2-ucd-register/contact-details/alt-formats/written-format', function(request, response) {
    var writtenFormat = request.session.data['written-format']
    if (writtenFormat == 'standard-letter'){
        response.redirect('/v2-ucd-register/additional-support/start-info')
    } else if (writtenFormat == 'large-print') {
        response.redirect('/v2-ucd-register/contact-details/alt-formats/large-print')
     } else if (writtenFormat == 'audio') {
        response.redirect('/v2-ucd-register/additional-support/start-info')
    } else if (writtenFormat == 'braille') {
        response.redirect('/v2-ucd-register/additional-support/start-info')
    } else if (writtenFormat == 'email') {
        response.redirect('/v2-ucd-register/contact-details/alt-formats/email-reason')
    } else if (writtenFormat == 'pdf') {
        response.redirect('/v2-ucd-register/contact-details/alt-formats/email-reason')
    } 
    
})

// What size print do you need?
router.post('/v2-ucd-register/contact-details/alt-formats/large-print', function(request, response) {
    response.redirect('/v2-ucd-register/additional-support/start-info')
})

// Why do you need us to contact you by email instead of printed letters?
router.post('/v2-ucd-register/contact-details/alt-formats/email-reason', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/alt-formats/what-is-your-email')
})

// What is your email address?
router.post('/v2-ucd-register/contact-details/alt-formats/what-is-your-email', function(request, response) {
    response.redirect('/v2-ucd-register/additional-support/start-info')
})

// What is your correspondence postcode page
router.post('/v2-ucd-register/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/v2-ucd-register/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/alt-formats/written-format')
})

// Confirm correspondence address page
router.post('/v2-ucd-register/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/contact-details/alt-formats/written-format')
})

//-------------------------------------------------------------------------------------------

//V2-UCD-REGISTER/additional-support

router.post('/v2-ucd-register/additional-support/start-info', function(request, response) {
            response.redirect('/v2-ucd-register/additional-support/do-you-have-a-condition')
})

// do you have a condition 
router.post('/v2-ucd-register/additional-support/do-you-have-a-condition', function(request, response) {
    var condition = request.session.data['condition']
    if (condition == 'yes'){
        response.redirect('/v2-ucd-register/additional-support/complete-forms')
    } else if (condition == 'no') {
        response.redirect('/v2-ucd-register/additional-support/advice-non-as-marker')
    }
})

// can you complete forms
router.post('/v2-ucd-register/additional-support/complete-forms', function(request, response) {
    var forms = request.session.data['forms']
    var letters = request.session.data['letters']
    var post = request.session.data['post'] 
    if (forms == 'yes' && letters == 'yes' && post == 'yes') {
        response.redirect('/v2-ucd-register/additional-support/advice-non-as-marker')
      } else if (forms == 'no' || letters == 'no' || post == 'no') {
        response.redirect('/v2-ucd-register/additional-support/helpers')
      }
})

// Do you have anyone to help you?
router.post('/v2-ucd-register/additional-support/helpers', function(request, response) {
    var anyoneHelp = request.session.data['helpers']
    if (anyoneHelp == 'yes'){
        response.redirect('/v2-ucd-register/additional-support/who-helps')
    } else if (anyoneHelp == 'no') {
        response.redirect('/v2-ucd-register/additional-support/advice-as-marker')
    }
})


router.post('/v2-ucd-register/additional-support/who-helps', function(request, response) {
    response.redirect('/v2-ucd-register/additional-support/advice-as-marker')
})

// Make the call?
router.post('/v2-ucd-register/additional-support/advice-as-marker', function(request, response) {
    var makeCall = request.session.data['makeTheCall']
    if (makeCall == 'yes'){
        response.redirect('/v2-ucd-register/nationality/start')
    } else if (makeCall == 'no') {
        response.redirect('/v2-ucd-registernationality/start')
    }
})

//----------------------------------------------------------------------------------------------------

//v2-ucd-register/nationality

//start
router.post('/v2-ucd-register/nationality/start', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/v2-ucd-register/nationality/what-is-your-nationality', function(request, response) {
    var nationality = request.session.data['nationality']
    if (nationality == 'british'){
        response.redirect('/v2-ucd-register/nationality/uk-2-of-3-years')
    } else if (nationality == 'irish') {
        response.redirect('/v2-ucd-register/nationality/uk-2-of-3-years')
    } else if (nationality == 'other') {
        response.redirect('/ucd-register/nationality/another-nationality')
    }
})

//UNHAPPY PATH
//Select other nationality
router.post('/v2-ucd-register/nationality/another-nationality', function(request, response) {
    var anotherNationality = request.session.data['another-nationality']
    if (anotherNationality == 'Norway' || anotherNationality == 'Iceland'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/living-in-uk-before')
    }
    if (anotherNationality == 'Australia' || anotherNationality == 'Brazil' ){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/granted-refugee-status')
    }
})


//Were you living in the UK on or before 31/12/20?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/living-in-uk-before', function(request, response) {
    var before = request.session.data['before']
    if (before == 'yes'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/eu-settlement-scheme')
    } else if (before == 'no') {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/granted-refugee-status')
    }
})

//Have you made an application to the EU Settlement Scheme or been given a status from the EU Settlement Scheme?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/eu-settlement-scheme', function(request, response) {
    var application = request.session.data['eu-settlement']
    if (application == 'yes'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/what-settlement-scheme')
    } else if (application == 'no') {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/granted-refugee-status')
    }
})

//Have you made an application to the EU Settlement Scheme or been given a status from the EU Settlement Scheme?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/what-settlement-scheme', function(request, response) {
    var scheme = request.session.data['what-scheme']
    if (scheme =='settled' || scheme =='pending'){
        response.redirect('/v2-ucd-register/nationality/what-country-do-you-live-in')
    } else if (scheme == 'pre-settled') {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/leave-to-remain-end')
    } else if (scheme == 'refused') {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/restrictions-on-leave-to-remain')
    }
    
})

//Have you been granted refugee or humanitarian protection status?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/granted-refugee-status', function(request, response) {
    var granted = request.session.data['granted-refugee']
    if (granted == 'yes'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/restrictions-on-leave-to-remain')
    } else if (granted == 'no') {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/passport-public-funds')
    }
})

//Does your passport, or any other document from the Home Office say ‘No recourse to public funds’?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/passport-public-funds', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/restrictions-on-leave-to-remain')
})

//What restrictions, if any, are there on your leave to remain?

router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/restrictions-on-leave-to-remain', function(request, response) {
  var restrictions = request.session.data['restrictions']
    if (restrictions =='none' || restrictions =='indefinite' || restrictions =='no-leave' || restrictions =='unknown'){
        response.redirect('/v2-ucd-register/nationality/what-country-do-you-live-in')
    } else if (restrictions =='limited'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/leave-to-remain-end')
       }  else if (restrictions == 'extension-applied') {
            response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/leave-to-remain-end-applied-for')
    } 
})

//Limited leave to remain- When does your leave to remain end?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/leave-to-remain-end', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/what-country-do-you-live-in')
})

//Limited leave to remain applied for- When does your leave to remain end?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/leave-to-remain-end-applied-for', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/unhappy-path/nationality-types/when-did-you-apply')
})

//When did you apply for extension?
router.post('/v2-ucd-register/nationality/unhappy-path/nationality-types/when-did-you-apply', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/what-country-do-you-live-in')
})

//----------------------------------------------------------------------------------------------------

//Have you been in the UK for at least 2 of the last 3 years?
router.post('/v2-ucd-register/nationality/uk-2-of-3-years', function(request, response) {
    var ukYears = request.session.data['uk-years']
    if (ukYears == 'yes'){
        response.redirect('/v2-ucd-register/nationality/exportability/working-paying-insurance-abroad')
    } else if (ukYears == 'no') {
        response.redirect('/v2-ucd-register/nationality/exportability/working-paying-insurance-abroad')
    } else if (ukYears == 'unsure') {
        response.redirect('/v2-ucd-register/nationality/exportability/working-paying-insurance-abroad')
    } 
})

// Another country
router.post('/v2-ucd-register/nationality/another-country-lived-in', function(request, response) {
    response.redirect('/v2-ucd-register/nationality/lived-elsewhere')
})


//When you lived abroad
router.post('/v2-ucd-register/nationality/unhappy-path/abroad-time/which-country-did-you-go-to', function(request, response) {
    var whyDidYouGo = request.session.data['why-did-you-go']
      if (whyDidYouGo =='holiday'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/more-places')
      } else if (whyDidYouGo =='other'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/intent-to-return')
         }  
  })

  //When you left the UK for more than four weeks
router.post('/v2-ucd-register/nationality/unhappy-path/abroad-time/left-the-uk-more-than-4-weeks', function(request, response) {
    var moreThanFour = request.session.data['more-than-four-weeks']
      if (moreThanFour =='holiday'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/more-places')
      } else if (moreThanFour =='other'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/intent-to-return')
         }  
  })

  //More places?
router.post('/v2-ucd-register/nationality/unhappy-path/abroad-time/more-places', function(request, response) {
    var morePlaces = request.session.data['more']
    if (morePlaces =='yes'){
        response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/the-other-time-you-went-away')
    } else if (morePlaces =='no'){
        response.redirect('/v2-ucd-register/nationality/exportability/working-paying-insurance-abroad')
       }  
})

//The other time you went away
router.post('/v2-ucd-register/nationality/unhappy-path/abroad-time/the-other-time-you-went-away', function(request, response) {
    var otherTime = request.session.data['other-time']
      if (otherTime =='holiday'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/more-places')
      } else if (otherTime =='other'){
          response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/intent-to-return')
         }  
  })
    //When you went away did you intend to return?
    router.post('/v2-ucd-register/nationality/unhappy-path/abroad-time/intent-to-return', function(request, response) {
        response.redirect('/v2-ucd-register/nationality/unhappy-path/abroad-time/more-places')
    })

//Are you working or paying national insurance in another country?

router.post('/v2-ucd-register/nationality/exportability/working-paying-insurance-abroad', function(request, response) {
    var payingInsurance= request.session.data['insurance-abroad']
    if (payingInsurance == 'no'){
      response.redirect('/v2-ucd-register/nationality/exportability/family-paying-insurance-abroad')
    } else if (payingInsurance == 'yes') {
        response.redirect('/v2-ucd-register/nationality/exportability/what-country-insurance')
    }
  })

    //Are any of your family members working or paying national insurance in another country?
    router.post('/v2-ucd-register/nationality/exportability/what-country-insurance', function(request, response) {
        response.redirect('/v2-ucd-register/nationality/exportability/receiving-benefits')
    })
    
  
  //Are any of your family members working or paying national insurance in another country?
  router.post('/v2-ucd-register/nationality/exportability/family-paying-insurance-abroad', function(request, response) {
    var payingInsurance= request.session.data['family-insurance-abroad']
    if (payingInsurance == 'no'){
      response.redirect('/v2-ucd-register/nationality/exportability/receiving-benefits')
    } else if (payingInsurance == 'yes') {
        response.redirect('/v2-ucd-register/nationality/exportability/family-country-insurance')
    }
  })

      //What country are your family members working or paying national insurance in?
      router.post('/v2-ucd-register/nationality/exportability/family-country-insurance', function(request, response) {
        response.redirect('/v2-ucd-register/nationality/exportability/receiving-benefits')
    })
  
  // Are you receiving pensions or benefits in another country?
  router.post('/v2-ucd-register/nationality/exportability/receiving-benefits', function(request, response) {
      var payingBenefits= request.session.data['receiving-benefits']
      if (payingBenefits == 'no'){
        response.redirect('/v2-ucd-register/nationality/exportability/family-receiving-benefits')
      } else if (payingBenefits == 'yes') {
          response.redirect('/v2-ucd-register/nationality/exportability/what-country-benefits')
      }
  })
  
        //What country are you receiving pensions or benefits in?
        router.post('/v2-ucd-register/nationality/exportability/what-country-benefits', function(request, response) {
            response.redirect('/v2-ucd-register/healthcare-professional/start')
        })
  
    //Are any of your family members receiving pensions or benefits in another country?
    router.post('/v2-ucd-register/nationality/exportability/family-receiving-benefits', function(request, response) {
        var payingBenefits= request.session.data['family-receiving-benefits']
        if (payingBenefits == 'no'){
        response.redirect('/v2-ucd-register/healthcare-professional/start')
        } else if (payingBenefits == 'yes') {
            response.redirect('/v2-ucd-register/nationality/exportability/family-country-benefits')
        }
    })

            //What country are your family members receiving pensions or benefits in?
            router.post('/v2-ucd-register/nationality/exportability/family-country-benefits', function(request, response) {
                response.redirect('/v2-ucd-register/healthcare-professional/start')
            })

  //----------------------------------------------------------------------------------------------------

   //v2-ucd-register/HEALTHCARE-PROFESSIONAL

   //start ---> healthcare-prof-type
router.post('/v2-ucd-register/healthcare-professional/start', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/healthcare-prof-type')
})


//healthcare-prof-type ---> what is their postcode
router.post('/v2-ucd-register/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/postcode')
})

//healthcare-prof-type ---> find address
router.post('/v2-ucd-register/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/postcode')
})

//find address ---> select address
router.post('/v2-ucd-register/healthcare-professional/postcode', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/select-your-address')
})

//select address ---> addiitonal support needed
router.post('/v2-ucd-register/healthcare-professional/select-your-address', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/additional-support-needed')
})

//enter-address-manually ----> second support needed?
router.post('/v2-ucd-register/healthcare-professional/enter-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/additional-support-needed')
})

//additional-support-needed ---> additional-support-type
router.post('/v2-ucd-register/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/v2-ucd-register/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/v2-ucd-register/healthcare-professional/consent-NI')
    }
})

//additional-support-type ---> find address
router.post('/v2-ucd-register/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/postcode-support')
})

//find address ---> select address
router.post('/v2-ucd-register/healthcare-professional/postcode-support', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/select-support-address')
})

//enter-address-manually ----> hospital and accom start
router.post('/v2-ucd-register/healthcare-professional/support-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/consent-NI')
})


//select support address ---> hospital and accom start
router.post('/v2-ucd-register/healthcare-professional/select-support-address', function(request, response) {
    response.redirect('/v2-ucd-register/healthcare-professional/consent-NI')
})

//consent NI ----> hospital and accom start
router.post('/v2-ucd-register/healthcare-professional/consent-NI', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-1-why-we-need-details')
})

//v2-ucd-register/HEALTHCARE-PROFESSIONAL/CYAS

//remove 2nd hcp
router.post('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-second-hcp')
    } else if (removeHcp == 'no'){
    response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/hp-summary-two')
}
})

//remove main hcp
router.post('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-main-professional', function(request, response) {
    var removeHcp = request.session.data['remove-main-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-main-hcp')
    } else if (removeHcp == 'no'){
    response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/hp-summary-two')
}
})

//remove final hcp
router.post('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-add-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-final-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/add-new/healthcare-prof-type')
    } else if (removeHcp == 'no'){
    response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-main-hcp')
}
})


//add new hcp from remocving all contacts---> do you want to add another contact?
router.post('/v2-ucd-register/healthcare-professional/hcp-cyas/add-new/additional-support-needed', function(request, response) {
    var removeHcp = request.session.data['support-needed']
    if (removeHcp == 'yes'){
        response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/add-new/additional-support-type')
    } else if (removeHcp == 'no'){
    response.redirect('/v2-ucd-register/healthcare-professional/hcp-cyas/remove-second-hcp')
}
})


// -------------------------------------------------------------------------------------

//v2-ucd-register/HOSPITAL-DATES

//hospital and accom start ----> Are you in hospital or hospice as an in-patient today?
router.post('/v2-ucd-register/hospital-dates/5-1-why-we-need-details', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-2-today')
})
// Are you in hospital or hospice as an in-patient today?
router.post('/v2-ucd-register/hospital-dates/5-2-today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/v2-ucd-register/hospital-dates/5-4-yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/v2-ucd-register/hospital-dates/5-3-other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/v2-ucd-register/hospital-dates/5-8-hospice-yesterday')
    }
})

// Were you in hospital yesterday?
router.post('/v2-ucd-register/hospital-dates/5-4-yesterday', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-5-private-patient')
})


// are you a private patient? > What is the name and address of the hospital?
router.post('/v2-ucd-register/hospital-dates/5-5-private-patient', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-6-postcode')
})

// postcode > select address
router.post('/v2-ucd-register/hospital-dates/5-6-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-7-select-hospital-address')
})

// postcode > select address
router.post('/v2-ucd-register/hospital-dates/5-7-select-hospital-address', function(request, response) {
    response.redirect('/v2-ucd-register/bank-details/6-1-start')
})

// hospital manually > motability
router.post('/v2-ucd-register/hospital-dates/5-17-hospital-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/motability/motability')
})

// hospice manually > motability
router.post('/v2-ucd-register/hospital-dates/5-18-hospice-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/motability/motability')
})

// other manually > motability
router.post('/v2-ucd-register/hospital-dates/5-19-other-address-manually', function(request, response) {
    response.redirect('/v2-ucd-register/motability/motability')
})

// Were you in hospice yesterday?
router.post('/v2-ucd-register/hospital-dates/5-8-hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/v2-ucd-register/hospital-dates/5-9-hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/v2-ucd-register/hospital-dates/5-10-hospice-postcode')
    }
})

// Do you know the date you went into the hospice?
router.post('/v2-ucd-register/hospital-dates/5-9-hospice-dates', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-10-hospice-postcode')
})

// select hospice address
router.post('/v2-ucd-register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-11-select-hospice-address')
})

// select hospice address
router.post('/v2-ucd-register/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-11-select-hospice-address')
})

//  Can you confirm the first line of the address place you are staying in? > motability
router.post('/v2-ucd-register/hospital-dates/5-11-select-hospice-address', function(request, response) {
    response.redirect('/v2-ucd-register/motability/motability')
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/v2-ucd-register/hospital-dates/5-3-other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/v2-ucd-register/hospital-dates/5-12-other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('/v2-ucd-register/motability/motability')
    }
})

// Were you living in this place yesterday?
router.post('/v2-ucd-register/hospital-dates/5-12-other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/v2-ucd-register/hospital-dates/5-15-other-postcode')
    } else if (otherYesterday == 'no') {
        response.redirect('/v2-ucd-register/hospital-dates/5-15-other-postcode')
    }
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/v2-ucd-register/hospital-dates/5-15-other-postcode', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-16-select-other-address')
})

// Select other address > tasklist
router.post('/v2-ucd-register/hospital-dates/5-16-select-other-address', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-13-third-party-pay')
})

// Does a health or social trust, health authority, government body, or a charity pay any of the costs for you to live there?
router.post('/v2-ucd-register/hospital-dates/5-13-third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'no') {
        response.redirect('/v2-ucd-register/bank-details/6-1-start')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/v2-ucd-register/hospital-dates/5-23-name')
    } else if (thirdPartyPay == 'health-trust') {
        response.redirect('/v2-ucd-register/hospital-dates/5-23-name-local')
    }
})

// What is the name of the [organisation type]?
router.post('/v2-ucd-register/hospital-dates/5-23-name', function(request, response) {
    response.redirect('/v2-ucd-register//motability/motability')
})

// local auth ---> What is the name -----> agreement?
router.post('/v2-ucd-register/hospital-dates/5-23-name-local', function(request, response) {
    response.redirect('/v2-ucd-register/hospital-dates/5-14-local-agreement')
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/v2-ucd-register/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/v2-ucd-register//motability/motability')
})
// -------------------------------------------------------------------------------------

//BANK DETAILS

//V2-UCD-REGISTER/BANK-DETAILS/MAIN-ACCOUNT-DETAILS

// Can you give me your account details now?
router.post('/v2-ucd-register/bank-details/6-1-start', function(request, response) {
    var detailsNow = request.session.data['details-now']
    if (detailsNow == 'yes'){
        response.redirect('/v2-ucd-register/bank-details/6-5-foreign-account')
    } else if (detailsNow == 'no') {
        response.redirect('/v2-ucd-register/bank-details/6-2-no-details-now')
    }
})

// Do you want to get payments in a UK account or a foreign account?
router.post('/v2-ucd-register/bank-details/6-5-foreign-account', function(request, response) {
    var uk = request.session.data['foreign-account']
    if (uk == 'uk'){
        response.redirect('/v2-ucd-register/bank-details/6-3-main-account-details-v2')
    } else if (uk == 'non-uk') {
        response.redirect('/v2-ucd-register/bank-details/6-6-foreign-account-details')
    }
})

// account details
router.post('/v2-ucd-register/bank-details/6-3-main-account-details-v2', function(request, response) {
    response.redirect('/v2-ucd-register/motability/motability')
})



// NOT FOR MTP foreign account details
router.post('/v2-ucd-register/bank-details/6-6-foreign-account-details', function(request, response) {
    response.redirect('/v2-ucd-register/task-list-bank-done')
})

// You can continue without entering account details
router.post('/v2-ucd-register/bank-details/6-2-no-details-now', function(request, response) {
    response.redirect('/v2-ucd-register/task-list-motability-done')
})

// -------------------------------------------------------------------------------------

// Motability > tasklist done
router.post('/v2-ucd-register/motability/motability', function(request, response) {
    response.redirect('/v2-ucd-register/task-list-bank-done')
})

// -------------------------------------------------------------------------------------

//Additional support new script route

//design-updates/new-script-as/

//start > complete forms 
router.post('/design-updates/new-script-as/start-info', function(request, response) {
    response.redirect('/design-updates/new-script-as/complete-forms')
})

//complete forms > read letters
router.post('/design-updates/new-script-as/complete-forms', function(request, response) {
    response.redirect('/design-updates/new-script-as/read-letters')
})

//read letters > helpers
router.post('/design-updates/new-script-as/read-letters', function(request, response) {
    response.redirect('/design-updates/new-script-as/helpers')
})

//helpers
router.post('/design-updates/new-script-as/helpers', function(request, response) {
    var helpers = reqest.session.data['helpers']
    if (helpers == 'yes'){
        response.redirect('/design-updates/new-script-as/who-helps')
    } else if (helpers == 'no') {
        response.redirect('/design-updates/new-script-as/advice')
    }
})

//read letters > helpers
router.post('/design-updates/new-script-as/who-helps', function(request, response) {
    response.redirect('/design-updates/new-script-as/advice')
})

// -------------------------------------------------------------------------------------