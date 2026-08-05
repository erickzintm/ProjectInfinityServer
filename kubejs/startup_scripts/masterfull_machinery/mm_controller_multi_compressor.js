MMEvents.registerControllers((event) => {
  event
    .create('multi_compressor_controller')
    .name('Multi Compressor Machine Controller')
    .type('mm:machine');
});

MMEvents.registerControllers((event) => {
  event
    .create('multi_compactor_controller')
    .name('Multi Compactor Machine Controller')
    .type('mm:machine');
});
