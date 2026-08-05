ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal('ProjectInfinity').then(
      Commands.literal('red_morningstar_aoe')
        .then(
          Commands.literal('disable').executes((ctx) => {
            const { player, server } = ctx.source;
            const pData = player.persistentData;
            if (player == null) return 0;

            pData['red_morningstar_aoe_disabled'] = true;

            player.tell([
              Text.translate('text.kubejs.red_morningstar_aoe.state'),
              Text.red(Text.translate('text.kubejs.red_morningstar_aoe.state.disabled')),
            ]);

            return 1;
          })
        )
        .then(
          Commands.literal('enable').executes((ctx) => {
            const { player, server } = ctx.source;
            const pData = player.persistentData;
            if (player == null) return 0;

            pData['red_morningstar_aoe_disabled'] = false;

            player.tell([
              Text.translate('text.kubejs.red_morningstar_aoe.state'),
              Text.green(Text.translate('text.kubejs.red_morningstar_aoe.state.enabled')),
            ]);

            return 1;
          })
        )
    )
  );
});

PlayerEvents.loggedIn((event) => {
  if (event.player.persistentData['red_morningstar_aoe_disabled'] == null) {
    event.player.persistentData['red_morningstar_aoe_disabled'] = true;
  }
});
