export default function () {
  this.transition(
    this.hasClass('panel-outlet'),
    this.fromRoute(null),
    this.use('toLeft'),
    this.reverse('toRight'),
    this.debug()
  );
}
