import 'package:flutter_test/flutter_test.dart';
import 'package:circularchain_mobile/main.dart';

void main() {
  testWidgets('CircularChain app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const CircularChainApp());
    expect(find.text('Marketplace'), findsWidgets);
  });
}
