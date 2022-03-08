const filterMessages = messages => message =>
    !messages.some(testRegexp => testRegexp.test(message));

const formatMessages = messages => `

>>>>>Not allowed messages START<<<<<
${messages
    .map(
        (msg, index) => `Message ${index + 1}:
${msg}

`
    )
    .join('')}>>>>>Not allowed messages END<<<<<

`;

const assertMessages = async (t, name, messagesList, allowedList) => {
    const notAllowedList = messagesList.filter(filterMessages(allowedList));
    await t
        .expect(notAllowedList.length === 0)
        .ok(
            `No console ${name} please. Just no. ${formatMessages(
                notAllowedList
            )}`
        );
};

const checkConsoleMessages = async (
    t,
    { errorList = [], warnList = [], logList = [] } = {},
    {
        globalErrorAllowedList = [],
        globalWarnAllowedList = [],
        globalLogAllowedList = [],
    } = {}
) => {
    const { error, warn, log } = await t.getBrowserConsoleMessages();

    const errorAllowedList = globalErrorAllowedList.concat(errorList);
    const warnAllowedList = globalWarnAllowedList.concat(warnList);
    const logAllowedList = globalLogAllowedList.concat(logList);

    await assertMessages(t, 'errors', error, errorAllowedList);
    await assertMessages(t, 'warns', warn, warnAllowedList);
    await assertMessages(t, 'logs', log, logAllowedList);
};

module.exports = { checkConsoleMessages };
