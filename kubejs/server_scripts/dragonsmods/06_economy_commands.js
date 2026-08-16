// ============================================================
// DragonsMods - Economy Commands v0.1
// Project Infinity
// ============================================================

ServerEvents.commandRegistry(event => {

  const {
    commands: Commands,
    arguments: Arguments
  } = event


  // ==========================================================
  // MOSTRAR SALDO
  // ==========================================================

  function showBalance(ctx) {

    const player = ctx.source.player

    const balance =
      global.DragonsMods.economy.getBalance(player)

    const formattedBalance =
      global.DragonsMods.economy.format(balance)

    global.DragonsMods.message(
      player,
      'economy.balance',
      {
        amount: formattedBalance
      }
    )

    return 1
  }


  // ==========================================================
  // TRANSFERÊNCIA ENTRE JOGADORES
  // ==========================================================

  function payPlayer(ctx) {

    const sender = ctx.source.player

    const target =
      Arguments.PLAYER.getResult(
        ctx,
        'target'
      )

    const amount =
      Arguments.DOUBLE.getResult(
        ctx,
        'amount'
      )


    // --------------------------------------------------------
    // Valor inválido
    // --------------------------------------------------------

    if (amount <= 0) {

      global.DragonsMods.message(
        sender,
        'economy.invalid_amount'
      )

      return 0
    }


    // --------------------------------------------------------
    // Impede transferência para si mesmo
    // --------------------------------------------------------

    if (sender.username === target.username) {

      global.DragonsMods.message(
        sender,
        'economy.cannot_pay_self'
      )

      return 0
    }


    // --------------------------------------------------------
    // Verifica saldo
    // --------------------------------------------------------

    const senderBalance =
      global.DragonsMods.economy.getBalance(sender)

    if (senderBalance < amount) {

      global.DragonsMods.message(
        sender,
        'economy.insufficient_funds'
      )

      return 0
    }


    // --------------------------------------------------------
    // Remove dinheiro do remetente
    // --------------------------------------------------------

    const removed =
      global.DragonsMods.economy.remove(
        sender,
        amount
      )

    if (!removed) {

      global.DragonsMods.message(
        sender,
        'economy.insufficient_funds'
      )

      return 0
    }


    // --------------------------------------------------------
    // Adiciona dinheiro ao destinatário
    // --------------------------------------------------------

    const added =
      global.DragonsMods.economy.add(
        target,
        amount
      )


    // --------------------------------------------------------
    // Segurança: rollback
    // --------------------------------------------------------

    if (!added) {

      global.DragonsMods.economy.add(
        sender,
        amount
      )

      global.DragonsMods.log.error(
        `Falha ao transferir Dracoins de ${sender.username} para ${target.username}. Operação revertida.`
      )

      return 0
    }


    // --------------------------------------------------------
    // Formata o valor
    // --------------------------------------------------------

    const formattedAmount =
      global.DragonsMods.economy.format(amount)


    // --------------------------------------------------------
    // Mensagem para quem enviou
    // --------------------------------------------------------

    global.DragonsMods.message(
      sender,
      'economy.sent',
      {
        amount: formattedAmount,
        player: target.username
      }
    )


    // --------------------------------------------------------
    // Mensagem para quem recebeu
    // --------------------------------------------------------

    global.DragonsMods.message(
      target,
      'economy.received',
      {
        amount: formattedAmount,
        player: sender.username
      }
    )


    // --------------------------------------------------------
    // Log da transação
    // --------------------------------------------------------

    global.DragonsMods.log.info(
      `TRANSFER | ${sender.username} -> ${target.username} | Ð ${formattedAmount}`
    )

    return 1
  }


  // ==========================================================
  // /saldo
  // ==========================================================

  event.register(
    Commands.literal('saldo')
      .executes(ctx => {
        return showBalance(ctx)
      })
  )


  // ==========================================================
  // /balance
  // ==========================================================

  event.register(
    Commands.literal('balance')
      .executes(ctx => {
        return showBalance(ctx)
      })
  )


  // ==========================================================
  // /pay <player> <amount>
  // ==========================================================

  event.register(

    Commands.literal('pay')

      .then(
        Commands.argument(
          'target',
          Arguments.PLAYER.create(event)
        )

          .then(
            Commands.argument(
              'amount',
              Arguments.DOUBLE.create(event)
            )

              .executes(ctx => {
                return payPlayer(ctx)
              })
          )
      )
  )


  // ==========================================================
  // /pagar <player> <amount>
  // Português / Espanhol
  // ==========================================================

  event.register(

    Commands.literal('pagar')

      .then(
        Commands.argument(
          'target',
          Arguments.PLAYER.create(event)
        )

          .then(
            Commands.argument(
              'amount',
              Arguments.DOUBLE.create(event)
            )

              .executes(ctx => {
                return payPlayer(ctx)
              })
          )
      )
  )


  // ==========================================================
  // /dracoins
  // Administração da economia
  // ==========================================================

  event.register(

    Commands.literal('dracoins')

      // Apenas operadores
      .requires(source => source.hasPermission(2))


      // ======================================================
      // /dracoins add <player> <amount>
      // ======================================================

      .then(
        Commands.literal('add')

          .then(
            Commands.argument(
              'target',
              Arguments.PLAYER.create(event)
            )

              .then(
                Commands.argument(
                  'amount',
                  Arguments.DOUBLE.create(event)
                )

                  .executes(ctx => {

                    const target =
                      Arguments.PLAYER.getResult(
                        ctx,
                        'target'
                      )

                    const amount =
                      Arguments.DOUBLE.getResult(
                        ctx,
                        'amount'
                      )

                    if (amount <= 0) {

                      ctx.source.sendFailure(
                        Text.of('Valor inválido.')
                      )

                      return 0
                    }

                    global.DragonsMods.economy.add(
                      target,
                      amount
                    )

                    global.DragonsMods.log.info(
                      `${ctx.source.textName} adicionou Ð ${amount} para ${target.username}`
                    )

                    ctx.source.sendSuccess(
                      Text.of(
                        `Adicionado Ð ${amount} para ${target.username}.`
                      ),
                      false
                    )

                    return 1
                  })
              )
          )
      )


      // ======================================================
      // /dracoins remove <player> <amount>
      // ======================================================

      .then(
        Commands.literal('remove')

          .then(
            Commands.argument(
              'target',
              Arguments.PLAYER.create(event)
            )

              .then(
                Commands.argument(
                  'amount',
                  Arguments.DOUBLE.create(event)
                )

                  .executes(ctx => {

                    const target =
                      Arguments.PLAYER.getResult(
                        ctx,
                        'target'
                      )

                    const amount =
                      Arguments.DOUBLE.getResult(
                        ctx,
                        'amount'
                      )

                    if (amount <= 0) {

                      ctx.source.sendFailure(
                        Text.of('Valor inválido.')
                      )

                      return 0
                    }

                    const success =
                      global.DragonsMods.economy.remove(
                        target,
                        amount
                      )

                    if (!success) {

                      ctx.source.sendFailure(
                        Text.of('Saldo insuficiente.')
                      )

                      return 0
                    }

                    global.DragonsMods.log.info(
                      `${ctx.source.textName} removeu Ð ${amount} de ${target.username}`
                    )

                    ctx.source.sendSuccess(
                      Text.of(
                        `Removido Ð ${amount} de ${target.username}.`
                      ),
                      false
                    )

                    return 1
                  })
              )
          )
      )


      // ======================================================
      // /dracoins set <player> <amount>
      // ======================================================

      .then(
        Commands.literal('set')

          .then(
            Commands.argument(
              'target',
              Arguments.PLAYER.create(event)
            )

              .then(
                Commands.argument(
                  'amount',
                  Arguments.DOUBLE.create(event)
                )

                  .executes(ctx => {

                    const target =
                      Arguments.PLAYER.getResult(
                        ctx,
                        'target'
                      )

                    const amount =
                      Arguments.DOUBLE.getResult(
                        ctx,
                        'amount'
                      )

                    if (amount < 0) {

                      ctx.source.sendFailure(
                        Text.of('Valor inválido.')
                      )

                      return 0
                    }

                    global.DragonsMods.economy.setBalance(
                      target,
                      amount
                    )

                    global.DragonsMods.log.info(
                      `${ctx.source.textName} definiu o saldo de ${target.username} para Ð ${amount}`
                    )

                    ctx.source.sendSuccess(
                      Text.of(
                        `Saldo de ${target.username} definido para Ð ${amount}.`
                      ),
                      false
                    )

                    return 1
                  })
              )
          )
      )
  )


  // ==========================================================
  // LOG
  // ==========================================================

  global.DragonsMods.log.info(
    'Comandos da Economy v0.1 registrados.'
  )

})