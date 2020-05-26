$('.toastsDefaultSuccess').click(function() {
    $(document).Toasts('create', {
      class: 'bg-success', 
      title: 'Toast Title',
      subtitle: 'Subtitle',
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
    })
  });

  $('.toastrDefaultSuccess').click(function() {
    toastr.success('Ajouter avec success')
  });