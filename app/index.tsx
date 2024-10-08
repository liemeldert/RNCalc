      import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import debounce from 'lodash.debounce';
import { parseAndEvaluateLaTeX } from '../lib/BathP';
import Katex from 'react-native-katex';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const [expression, setExpression] = React.useState('');
  const [evaluation, setEvaluation] = React.useState('');

  const evaluateExpression = (expr: string) => {
    try {
      const result = parseAndEvaluateLaTeX(expr);
      setEvaluation(result.toString());
    } catch (error) {
      setEvaluation('Error');
    }
  };

  const debouncedEvaluateExpression = useCallback(debounce(evaluateExpression, 500), []);

  const handleInputChange = (text: string) => {
    setExpression(text);
    debouncedEvaluateExpression(text);
  };

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full max-w-xl p-6 rounded-2xl'>
        <CardHeader className='items-center'>
          <CardTitle>LaTeX Expression Evaluator</CardTitle>
          <CardTitle>{evaluation}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input value={expression} onChangeText={handleInputChange} placeholder='Enter a LaTeX expression to evaluate' />
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <View className='mt-4 text-2xl'>
            <Text className='text-sm text-muted-foreground'>Rendered LaTeX:</Text>
            <Katex expression={expression} />
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}