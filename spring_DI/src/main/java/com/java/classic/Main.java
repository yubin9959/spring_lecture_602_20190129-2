package com.java.classic;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Main {

	public static void main(String[] args) {
		
		/*Calculator calc=new Calculator();
		PrintScreenCalc p = new PrintScreenCalc();
		
		p.setCalc(calc); // 조립과정
*/		
		
		ApplicationContext ctx=
				new GenericXmlApplicationContext("classpath:application-context.xml");
		
		PrintScreenCalc p= ctx.getBean("printCalc",PrintScreenCalc.class);
		
		float a=1f,b=3f;
		p.printSum(a, b);
		p.printSub(a, b);
		p.printMulti(a, b);
		p.printDiv(a, b);	

	}

}
